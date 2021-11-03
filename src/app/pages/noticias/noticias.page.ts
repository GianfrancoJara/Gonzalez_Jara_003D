import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import {Article} from '../../interfaces/interfaces';
import { MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Article[] = []

  constructor(private noticiasService:NoticiasService, private menuController: MenuController, public navCtrl: NavController) { }

  ngOnInit() {
    this.noticiasService.getTopHeadLines().subscribe(resp=>{
      console.log('noticias', resp);
      //push permite añadir al arreglo cada objeto de tipo noticias obtenidas desde el servicio.
      this.noticias.push(...resp.articles);
    });
  }

  logout() {
    alert('Has cerrado sesión exitosamente');
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('inicio');
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

}
