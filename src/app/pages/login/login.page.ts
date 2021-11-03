import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList')myList :IonList;

  constructor(private storageService: ServicesdatosService, 
    private plt: Platform, private toastController: ToastController, private menuController: MenuController
    , public navCtrl: NavController) {
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
  
  ingresar(){
    let userlogin = this.newDato.usuario;
    let passlogin = this.newDato.password;
    console.log(userlogin);
    let validado = false;
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
      for(let dato in datos){
        let userparcial = datos[dato].usuario;
        let pwparcial = datos[dato].password;
        if(userparcial === userlogin && pwparcial === passlogin){
          validado = true;
        }
      }
    console.log(validado);
    if(validado){
      localStorage.setItem('ingresado','true');
      this.showToast('Bienvenid@ '+userlogin+'.');
      this.navCtrl.navigateRoot('contenido');
    }
    else{
      this.showToast('Usuario/contraseña no válidos')
    }
    });
  }
  //create
  registrarUsuario(){
    let username = this.newDato.usuario;
      this.storageService.addDatos(this.newDato).then(dato=>{
        this.newDato = <Datos>{};
        this.showToast('Usuario '+username+' Registrado');
        this.loadDatos();
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
