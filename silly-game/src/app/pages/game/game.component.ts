import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'game-component',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ]
})
export class GameComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit(): void {
  }
  update(index) {
    // this.chart.data.datasets[0].data[index] = this.chart.data.datasets[0].data[index] + 2;
    // this.chart.update();
  } 
}