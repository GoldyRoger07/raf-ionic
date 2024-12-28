import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { TokenService } from './token.service';
import { Compte } from '../models/Compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(
    private http:HttpClient,
    private urlService:UrlService,
    private tokenService:TokenService
  ) {}

    // const headers = this.tokenService.getHeadersWithToken()
  inscriptionPartie1(compte:Compte){
     return this.http.post(this.urlService.compteUrl+"/inscription-partie1", compte)
  }

  inscriptionPartie2(compte:Compte){
    return this.http.post(this.urlService.compteUrl+"/inscription-partie2", compte)
  }

  verifierCode(code: string){

     const responseBody = {
      codeVerification: code,
      email: localStorage.getItem("email")
     }
     return this.http.post(this.urlService.baseUrl+"/email/code-verification",responseBody)
  }

  resendCodeVerification(){
    const responseBody = {
      email: localStorage.getItem("email")
    }
    this.http.post(this.urlService.baseUrl+"/email/resend/code-verification",responseBody).subscribe()
  }

  login(compte:Compte){
    return this.http.post(this.urlService.compteUrl+"/login",compte)
  }

  ping(){
    
    return this.http.get(this.urlService.compteUrl+"/ping-test")
  }

}
