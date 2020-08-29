import {Component, OnInit} from '@angular/core';
import {Encuesta, TipoEncuestaEnum} from "../../personas/encuesta";
import {Pregunta, TipoPreguntaEnum} from "../../personas/pregunta";
import {Opcion, TipoOpcionEnum} from "../../personas/opcion";
import {EncuestasService} from "../../services/encuestas.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Persona} from "../../personas/persona";
import {Categoria} from "../../personas/categoria";
import {PersonaService} from "../../personas/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-encuesta-crear',
  templateUrl: './encuesta-crear.component.html',
  styleUrls: ['./encuesta-crear.component.css']
})
export class EncuestaCrearComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  public errores: string[];
  public categorias: Categoria[];

  public _rangeEscale: [number, number, number, number, number, number, number, number, number];

  constructor(private encuestasService: EncuestasService,
              private personaService:PersonaService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const date = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, date);
    this.maxDate = new Date(currentYear + 1, currentMonth, date);
    this._rangeEscale = [2,3,4,5,6,7,8,9,10];

    this.categorias = [];
  }

  public encuesta: Encuesta = new Encuesta();

  ngOnInit(): void {
    this.encuesta.tipo = TipoEncuestaEnum.ABIERTO;
    this.encuestasService.getAllCategorias().subscribe(categorias => {
      categorias.forEach((categoria, index) => {
        this.categorias[index] = categoria;
      })
      console.log("Categorias adentro: " + JSON.stringify(this.categorias));
    });
    this.agregarPregunta();
  }


  tiposEncuesta = Object.keys(TipoEncuestaEnum).map(key => TipoEncuestaEnum[key]);

  tipos = Object.keys(TipoPreguntaEnum).map(key => TipoPreguntaEnum[key]);

  agregarPregunta() {
    if (!this.encuesta.preguntas) {
      // en caso de encuesta nueva, inicializamos las preguntas.
      this.encuesta.preguntas = [];
    }
    const newPregunta = new Pregunta();
    // inicializamos el tipo de pregunta como default REPUESTA_SIMPLE
    newPregunta.tipo = TipoPreguntaEnum.RESPUESTA_SIMPLE;
    this.encuesta.preguntas.push(newPregunta);
  }

  agregarOpcionSimple(id) {
    // console.log(id);
    if (!this.encuesta.preguntas[id].opciones) {
      this.encuesta.preguntas[id].opciones = [];
    }
    // console.log(this.encuesta.preguntas)
    if (this.encuesta.preguntas[id].opciones.length < 1) {
      const newOpcionSimple = new Opcion();
      newOpcionSimple.tipo = TipoOpcionEnum.RESPUESTA_SIMPLE;
      console.log(this.encuesta.preguntas[id].opciones)
      this.encuesta.preguntas[id].opciones.push(newOpcionSimple);
    }
  }

  salvarEncuesta() {
    // console.log('encuesta DTO', this.encuesta);

    const usuario = {id: JSON.parse(sessionStorage.getItem('persona')).id};
    // persona.id = JSON.parse(sessionStorage.getItem('persona')).id;
    this.encuesta.usuario = usuario;
    console.log("mi id desde session storage: " + this.encuesta.usuario.id);

    // this.personaService.getPersona(JSON.parse(sessionStorage.getItem('persona')).id).subscribe(response=>{
    //   console.log(response);
    //   this.encuesta.usuario = response;
    // })
    this.encuestasService.save(this.encuesta).subscribe(response => {
        this.router.navigate(['/encuestas'])
        Swal.fire('Encuesta Generada', `${response.mensaje}: ${response.encuesta.titulo}`, 'success')
        // this._snackBar.open("Encuesta Creada", "deshacer", {duration: 4000,verticalPosition: "bottom"});
      },
      error => {
        this.errores = error.error.errors as string[];
        console.log('Codigo de error desde backend: ' + error.status)
        console.log(error.error.errors)
      }
    );
    // console.log(this.encuestasService.save(this.encuesta));
  }

  agregarOpcionMultiple(id: number) {
    console.log(id);
    if (!this.encuesta.preguntas[id].opciones) {
      this.encuesta.preguntas[id].opciones = [];
    }
    const newOpcionSimple = new Opcion();
    newOpcionSimple.tipo = TipoOpcionEnum.RESPUESTA_SIMPLE;
    console.log(this.encuesta.preguntas[id].opciones)
    this.encuesta.preguntas[id].opciones.push(newOpcionSimple);
  }
}
