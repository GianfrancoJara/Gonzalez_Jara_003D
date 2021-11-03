import { Component, OnInit } from '@angular/core';
import { MenuController, NavController} from '@ionic/angular';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.page.html',
  styleUrls: ['./contenido.page.scss'],
})
export class ContenidoPage implements OnInit {

  constructor(private menuController: MenuController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  logout() {
    this.navCtrl.navigateRoot('inicio');
    localStorage.removeItem('ingresado');
    alert('Has cerrado sesión exitosamente');
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

}
