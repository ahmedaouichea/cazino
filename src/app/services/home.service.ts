import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private httpClient: HttpClient) { }


getJackpot(): Observable<any> {
  const req = "https://run.mocky.io/v3/48e6a74e-65ee-48e7-a321-b7e4578da2a4";
  return this.httpClient.get<any>(req);
}


}
