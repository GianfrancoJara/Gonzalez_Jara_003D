import { Component } from '@angular/core';

interface Componente{
  icon: string; 
  name: string; 
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  componentes : Componente[] = [
    {
      icon: 'accessibility-outline',
        name: 'Inicio',
        redirecTo: '/inicio'
      },
    {
      icon: 'game-controller-outline',
      name: 'Info Gaming',
      redirecTo: '/contenido'
    },
    {
      icon: 'document-text-outline',
      name: 'Tecnoticias',
      redirecTo: '/noticias'
    },
    {
      icon: 'clipboard-outline',
      name: 'Registro',
      redirecTo: '/registro'
    },
    {
      icon: 'enter-outline',
      name: 'Login',
      redirecTo: '/login'
    },

    
  ];
}