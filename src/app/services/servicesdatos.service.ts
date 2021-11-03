import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Datos{
  usuario: string,
  password: string,
}

const ITEMS_KEY = 'my-datos';


@Injectable({
  providedIn: 'root'
})
export class ServicesdatosService {

  private _storage : Storage;

  constructor(private storage: Storage) {
    this.init(); 
  }
//definimos en un método la creación del almacenamiento
async init(){
  const storage = await this.storage.create();
  this._storage= storage;
}

//implementar los métodos para la manipulación de nuestro storage
//agregaremos un objeto a la colección
//el método recibe un parámetro llamado dato, devuelve una promesa. 
//Permite obtener las claves de los objetos y los almacena en datos.
//Crea un espacio en la memoria a través de push con la información del nuevo objeto a crear
//El nuevo objeto es seteado al storage por medio de las claves. 
addDatos(dato: Datos):Promise<any>{
 return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
    if (datos) {
      datos.push(dato);
      return this.storage.set(ITEMS_KEY, datos);
    }else {
      return this.storage.set(ITEMS_KEY, [dato]);
    }

  })
}

 //Nos permmite obtener la información almacenada en el storage 
 //por medio de sus keys 

 getDatos(): Promise<Datos[]>{
  return this.storage.get(ITEMS_KEY);
}
getDatos2(): Promise<Datos[]>{
  return this.storage.get('my-datos');
}
//actualizar información de un objeto 
updateDatos(dato: Datos): Promise<any>{
  return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
    if (!datos || datos.length == 0){
      return null;
    }
    let newDato: Datos[] = [];
    for (let i of datos){
      if (i.usuario === dato.usuario){
        newDato.push(dato);
      }
      else{
        newDato.push(i);
      }
    }
    return this.storage.set(ITEMS_KEY, newDato);
  });
}

 //Eliminar
deleteDatos(usuario: string): Promise<Datos>{
  return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
    if (!datos || datos.length === 0){
      return null;
    }
    let toKeep: Datos[] = []; 
    for (let i of datos){
      if (i.usuario !== usuario){
        toKeep.push(i);
      }
    }
    return this.storage.set(ITEMS_KEY, toKeep);
  });

}


}

