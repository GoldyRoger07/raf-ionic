import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { CompteService } from './compte.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private compteService:CompteService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    
    if(this.compteService.isAgent)
      return true
  
    this.router.navigate(["/accueil"])
    return false
  }
}

// async function isAuth(compteService:CompteService) {
   
//   compteService.ping().subscribe({
//     next: ()=>{
      
//       return 
//     },
//     error: ()=>{
      
//       this.router.navigate(["/login"])
//       console.log("error")
//     }
//   })
// }
