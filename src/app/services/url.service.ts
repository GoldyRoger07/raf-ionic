import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseUrl = "http://localhost:8080/api/raf"

  compteUrl = this.baseUrl+"/compte"

  constructor() { }
}
