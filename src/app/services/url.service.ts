import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  serverUrl = "http://192.168.0.196:8080"
  // serverUrl = "http://localhost:8080"

  baseUrl = this.serverUrl+"/api/raf"
  // baseUrl = "http://192.168.0.178:8080/api/raf"

  compteUrl = this.baseUrl+"/compte"

  exceptionUrls = [
    this.compteUrl+"/login",
    this.compteUrl+"/inscription-partie1",
    this.compteUrl+"/inscription-partie2",
    this.baseUrl+"/email/code-verification",
    this.baseUrl+"/email/resend/code-verification",
    this.baseUrl+"/compte/forget-password",
    this.baseUrl+"/compte/forget-password2"
  ]

  constructor() { }

  redirectTo(url:string){
    window.location.href = url
  }

  reload(){
    window.location.reload()
  }
}
