import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './services/game.service';
import { AppRoutingModule }     from './app-routing.module';

import { AdminComponent }   from './pages/admin/admin.component';
import { GameComponent }   from './pages/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
