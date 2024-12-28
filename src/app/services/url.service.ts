import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseUrl = "http://localhost:8080/api/raf"
  // baseUrl = "http://192.168.0.178:8080/api/raf"

  compteUrl = this.baseUrl+"/compte"

  exceptionUrls = [this.compteUrl+"/login",this.compteUrl+"/inscription-partie1",this.compteUrl+"/inscription-partie2"]

  constructor() { }
}
