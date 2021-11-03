import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList')myList :IonList;

  constructor(private storageService: ServicesdatosService, 
    private plt: Platform, private toastController: ToastController, private menuController: MenuController) {
      this.plt.ready().then(()=>{
        this.loadDatos();
      });
    }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  //get
  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    });
  }

  //create
  registrarUsuario(){
    let username = this.newDato.usuario;
    console.log(username);
    let duplicado = false;
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
      for(let dato in datos){
        let userparcial = datos[dato].usuario;
        if(userparcial === username){
          duplicado = true;
        }
      }
    console.log(duplicado);
    if(duplicado){
      this.showToast('El nombre de usuario no está disponible.');
    }
    else{
      this.storageService.addDatos(this.newDato).then(dato=>{
        this.newDato = <Datos>{};
        this.showToast('Usuario '+username+' Registrado');
        this.loadDatos();
      });
    }
    });
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg, 
      duration: 2000
    });
    toast.present();
  }

}
