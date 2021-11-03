import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLogueadoGuard implements CanActivate {

  constructor(public navCtrl: NavController){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('ingresado')){
        this.navCtrl.navigateRoot('contenido');
        alert('! Error ! Ya estas logueado');
        return true;
      }
      else{
        return true;
      }
  }
  
}
