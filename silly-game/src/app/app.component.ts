import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

}
