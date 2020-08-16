import {Component, OnInit} from '@angular/core';
import {Encuesta} from "../../personas/encuesta";

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css']
})
export class EncuestaCrearComponent implements OnInit {

  constructor() {
  }

  public Encuesta: Encuesta = new Encuesta();
  tipo_pregunta: String;

  ngOnInit(): void {
  }

  tipos = ['Respuesta Simple', 'Parrafo', 'Opcion Multiple', 'Casillas de Verificacion', 'Escala Lineal'];
  // tipos = [{value: 'steak-0'}, {value: 'pizza-1'}, {value: 'tacos-2'}];

  agregarPregunta(){
    console.log("agrega seccion pregunta")
    let row = document.createElement('div');
      row.className = 'row';
      row.innerHTML =` <mat-card style="margin-top: 10px">
        <div class="pregunta-header">
          <div style="width: 70%">
            <mat-form-field style="width: 50%">
              <mat-label>Pregunta</mat-label>
              <input matInput value="Pregunta sin titulo"/>
            </mat-form-field>
          </div>
          <mat-select [(value)]="tipos[0]" style="width: 30% ">
            <mat-option *ngFor="let tipo of tipos" [value]="tipo">
              {{tipo}}
            </mat-option>
          </mat-select>
        </div>
        <div class="pregunta-body">
        </div>
      </mat-card>`;
    document.querySelector('.generateField').appendChild(row);
  }
}
