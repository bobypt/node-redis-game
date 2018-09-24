import { Component, OnInit } from '@angular/core';
import { Options } from "./option.interface";
import { GameService } from '../../services/game.service';

@Component({
  selector: 'game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  options: Options[] = [
    { name: "RED", key: "key-red", class: "btn-danger" },
    { name: "GREEN", key: "key-green", class: "btn-success" },
    { name: "BLUE", key: "key-blue", class: "btn-primary" }
  ];

  animate: boolean = true;


  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
  }

  update(option) {
    this.animate = !this.animate;
    this.shuffle(this.options);
    console.log("seletced  " + option.key);
    this._gameService.incrementKey(option.key).subscribe(
        (data : any) => { console.log("updated successfully")},
        err => console.error(err),
        () => console.log('done')
      );
  }


  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}