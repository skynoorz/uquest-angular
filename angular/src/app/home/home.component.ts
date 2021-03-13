import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  descripcionRecibe :string;
  descripcionPrivada :string;
  constructor() {
    this.descripcionRecibe = "Ya sea si eres un profesor o un estudiante recibe las encuestas donde quiera que te encuentres, desde el movil o desde una computadora, ¡Asi de facil! a unos cuantos clicks de conocer que es lo que opinan los demas, intentalo!.";
    this.descripcionPrivada = "Tus encuestas estan a salvo con nosotros, la informacion no se filtrara al publico a no ser que tu lo desees de esa forma!, contamos con un sistema de seguridad muy eficiente a cualquier tipo de suceso.";
  }

  ngOnInit(): void {
     }
}
