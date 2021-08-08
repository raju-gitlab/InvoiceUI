import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private HttpClient : HttpClient) { }

  url = "https://localhost:5001/";

  Get(urlParam : string){
    return this.HttpClient.get(this.url + urlParam,{'headers':this.headers()});
  }

  LoginPost(urlParam : string , Data : Object) : Observable<any>
  {
    return this.HttpClient.post(this.url + urlParam,Data);
  }
  Post(urlParam : string , Data : Object) : Observable<any>
  {
    return this.HttpClient.post(this.url + urlParam,Data,{'headers':this.headers()});
  }

  Put(urlParam : string , Data : Object)
  {
    return this.HttpClient.put(this.url + urlParam,Data);
  }

  Delete(urlParam : string)
  {
    return this.HttpClient.delete(this.url + urlParam,{'headers':this.headers()});
  }

  public headers() {
    const UserId = localStorage.getItem("UserId");
    const httpHeaders = new HttpHeaders({
      'apptype': 'Web', 'Cache-Control': 'no-cache', 'Content-Type': 'application/json; charset=utf-8','UserId': UserId
    });

    return httpHeaders;
  };
}
