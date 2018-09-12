import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.css' ]
})
export class AdminComponent implements OnInit {
  chart : any = [] ;  
  constructor(
  ) {}

  ngOnInit(): void {
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