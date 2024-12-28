import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getHeadersWithToken():HttpHeaders{
        const token = localStorage.getItem('token'); // ou sessionStorage
    
        // Crée les headers avec le token
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    
  }
}
