import { Component } from '@angular/core';
import { GameService } from './game.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chart : any = [] ;
  stat = 0;

  constructor(private _game: GameService) {
    _game.stat().subscribe(
      (data : any) => { this.stat = Number(data.value)},
      err => console.error(err),
      () => console.log('done loading data')
    );
  } 

  ngOnInit() {
  }  


  update(index) {
    this.chart.data.datasets[0].data[index] = this.chart.data.datasets[0].data[index] + 2;
    this.chart.update();
  }


  ngAfterContentInit() {
    this.chart = new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ["Red", "Green", "Blue"],
        datasets: [
          {
            label: ["Score"],
            backgroundColor: ["#ff0000", "#00ff00","#0000ff"],
            data: [30,20,10]
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
