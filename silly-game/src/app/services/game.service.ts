import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http: HttpClient) { }

  stat() {
    return this._http.get("http://localhost:8080/api/v1/gameservice/score/red-count");
  }
}
