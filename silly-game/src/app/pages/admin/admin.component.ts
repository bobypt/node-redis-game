import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GameService } from '../../services/game.service';
import { timer, Subscription} from 'rxjs';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  values = new Map<string, number>();

  chart: any = [];
  timerSubscription : Subscription;
  pause: boolean = false;


  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.createChart();

    this.timerSubscription = timer(1000, 1000)
    .subscribe(val => {
      if(!this.pause) {
        this.updateAll();
      }
    }); 

  }

  togglePause() {
    this.pause = !this.pause;
  }  
  updateAll() {
    this.updateData("key-red");
    this.updateData("key-green");
    this.updateData("key-blue");

    this.updateChart();
  }


  updateData(key) {
    this._gameService.getStat(key).subscribe(
      (data : any) => { this.values[key] = data.value; this.updateChart();},
      err => console.error(err),
      () => console.log('done')
    );
  }
  

  updateChart() {
    this.chart.data.datasets[0].data = [this.values["key-red"], this.values["key-green"], this.values["key-blue"] ]
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ["Red", "Green", "Blue"],
        datasets: [
          {
            label: ["Score"],
            backgroundColor: ["#ff0000", "#00ff00", "#0000ff"],
            data: [0, 0, 0]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Score'
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
            }
          }]
        }
      }
    });
  }



}