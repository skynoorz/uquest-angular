import {Component, OnInit, ViewChild} from '@angular/core';
import {Encuesta, TipoEncuestaEnum} from "../../classes/encuesta";
import {Pregunta, TipoPreguntaEnum} from "../../classes/pregunta";
import {Opcion, TipoOpcionEnum} from "../../classes/opcion";
import {EncuestasService} from "../../services/encuestas.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Categoria} from "../../classes/categoria";
import {PersonaService} from "../../personas/persona.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForm} from "@angular/forms";
import {CarreraService} from "../../services/carrera.service";
import {Carrera} from "../../classes/carrera";

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
  public carreras: Carrera[];

  public _rangeEscale: number[];

  tiposEncuesta = Object.keys(TipoEncuestaEnum).map(key => TipoEncuestaEnum[key]);
  tipos = Object.keys(TipoPreguntaEnum).map(key => TipoPreguntaEnum[key]);

  constructor(private encuestasService: EncuestasService,
              private personaService: PersonaService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private carreraService: CarreraService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const date = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, date);
    this.maxDate = new Date(currentYear + 1, currentMonth, date);
    this._rangeEscale = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.categorias = [];
  }

  public encuesta: Encuesta = new Encuesta();
  public encuestaSend: Encuesta = new Encuesta();

  @ViewChild('form')
  form: NgForm;

  timer;

  ngOnInit(): void {
    this.cargarEncuestaBackup();
    // this.encuesta.tipo = TipoEncuestaEnum.ABIERTO;
    this.cargarCategorias();
    this.cargarCarreras();
    if (!localStorage.getItem('encuestaBackup')) {
      this.agregarPreguntaDefault();
    }

    this.timer = setTimeout(() => {
      //   if (this.form){
      this.form.valueChanges.subscribe(() => {
        localStorage.setItem('encuestaBackup', JSON.stringify(this.encuesta));
      })
      // }
    },1000)
  }

  reset() {
    this.form.reset();
  }

  cargarCarreras(){
    this.carreraService.getCarreras().subscribe(carreras=>{
      this.carreras = carreras;
    })
  }

  cargarEncuestaBackup() {
    if (localStorage.getItem('encuestaBackup'))
      this.encuesta = JSON.parse(localStorage.getItem('encuestaBackup'));
  }

  cargarCategorias() {
    this.encuestasService.getAllCategorias().subscribe(categorias => {
      categorias.forEach((categoria, index) => {
        this.categorias[index] = categoria;
      })
      // console.log("Categorias adentro: " + JSON.stringify(this.categorias));
    });
  }

  agregarPreguntaDefault() {
    if (!this.encuesta.preguntas) {
      // en caso de encuesta nueva, inicializamos las preguntas.
      this.encuesta.preguntas = [];
    }

    const newPregunta = new Pregunta();
    // inicializamos el tipo de pregunta como default REPUESTA_SIMPLE
    newPregunta.tipo = TipoPreguntaEnum.RESPUESTA_SIMPLE;
    this.encuesta.preguntas.push(newPregunta);

  }

  quitarPreguntaDefault() {
    if (this.encuesta.preguntas.length > 1) {
      this.encuesta.preguntas.pop();
    }
  }

  clearIds(encuesta: Encuesta){
    // CATEGORIAS
    if (encuesta.categoria)
      // @ts-ignore
      encuesta.categoria = {"id": encuesta.categoria};
    else
      encuesta.categoria = null;
    // CARRERAS
    let carreras: any[] = [];
    console.log("carreras:",encuesta.carreras)
    encuesta.carreras.forEach(c=>{
      carreras.push({"id": c})
      encuesta.carreras = carreras;
    });
    // PREGUNTAS
    encuesta.preguntas.map(p=>{
      if (p.id) delete p.id;
      if (p.opciones) p.opciones.map(o=>{delete o.id;})
    })
    delete encuesta.id;
    return encuesta;
  }

  salvarEncuesta() {

    const usuario_id = {id: JSON.parse(sessionStorage.getItem('persona')).id};
    this.encuesta.usuario = usuario_id;

    if (this.encuesta.fechaIni && this.encuesta.fechaFin){
      const fini = Date.parse(this.encuesta.fechaIni);
      const ffin = Date.parse(this.encuesta.fechaFin);

      // control de fechas improvisada
      if (ffin < fini){
        // console.log("entra al ffin < fini")
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'La fecha final no puede ser menor a la inicial!',
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        if (fini > ffin){
          // console.log("entra al fini > ffin")
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'La fecha inicial no puede ser mayor a la fecha final!',
            // footer: '<a href>Why do I have this issue?</a>'
          })
        }
        else {
          console.log(this.encuesta);
          this.encuestaSend = JSON.parse(JSON.stringify(this.encuesta));
          //limpia los ids antes de enviarlos, esto en caso de copiar una encuesta
          if (this.encuestaSend.carreras){
            this.encuestaSend = this.clearIds(this.encuestaSend);
            this.encuestasService.save(this.encuestaSend).subscribe(response => {

                this.router.navigate(['/encuestas'])
                Swal.fire('Encuesta Generada', `${response.mensaje}: ${response.encuesta.titulo}`, 'success')
                this.limpiarEncuesta();
                localStorage.removeItem('encuestaBackup');
              },
              error => {
                this.errores = error.error.errors as string[];
                console.log('Codigo de error desde backend: ' + error.status)
                console.log(error.error.errors)
                if (error.error.errors) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: error.error.errors[0],
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
                } else {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Revisar bien las preguntas elaboradas!',
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
                }
              }
            );
          }else{
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'No hay carreras seleccionadas para publicar la encuesta!',
              // footer: '<a href>Why do I have this issue?</a>'
            })
          }

        }
      }
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Las fechas son requeridas!',
        // footer: '<a href>Why do I have this issue?</a>'
      })
    }

    // this.personaService.getPersona(JSON.parse(sessionStorage.getItem('persona')).id).subscribe(response=>{
    //   console.log(response);
    //   this.encuesta.usuario = response;
    // })

    // console.log(this.encuestasService.save(this.encuesta));
  }

  agregarOpcionMultiple(id: number) {
    this.agregarOpcion(id, TipoOpcionEnum.OPCION_MULTIPLE);
  }

  quitarOpcionMultiple(id: number) {
    this.quitarOpcion(id);
  }

  agregarOpcion(id: number, tipo: TipoOpcionEnum) {
    if (!this.encuesta.preguntas[id].opciones) {
      this.encuesta.preguntas[id].opciones = [];
    }
    const newOpcion = new Opcion();
    newOpcion.tipo = tipo;
    // console.log(this.encuesta.preguntas[id].opciones)
    this.encuesta.preguntas[id].opciones.push(newOpcion);
  }

  quitarOpcion(id: number) {
    if (this.encuesta.preguntas[id].opciones.length > 1) {
      this.encuesta.preguntas[id].opciones.pop();
    }
  }

  checkTipo(event: any, id: number) {
    console.log(event.value);
    if (this.encuesta.preguntas[id].opciones)
      console.log(this.encuesta.preguntas[id].opciones.length)
    switch (event.value) {
      case TipoPreguntaEnum.OPCION_MULTIPLE: {
        if (!this.encuesta.preguntas[id].opciones || this.encuesta.preguntas[id].opciones.length == 0)
          this.agregarOpcionMultiple(id);
        break
      }
      case TipoPreguntaEnum.CASILLAS_DE_VERIFICACION: {
        if (!this.encuesta.preguntas[id].opciones || this.encuesta.preguntas[id].opciones.length == 0)
          this.agregarOpcion(id, TipoOpcionEnum.CASILLAS_DE_VERIFICACION);
        break
      }
      case TipoPreguntaEnum.ESCALA_LINEAL: {
        this.encuesta.preguntas[id].opciones = [];
        this.agregarOpcion(id, TipoOpcionEnum.ESCALA_LINEAL);
        break
      }
      case TipoPreguntaEnum.RESPUESTA_SIMPLE: {
        console.log("comparo: " + TipoOpcionEnum + " con: " + event.value)
        this.encuesta.preguntas[id].opciones = [];
        // this.agregarOpcion(id, TipoOpcionEnum.RESPUESTA_SIMPLE);
        break
      }
      case TipoPreguntaEnum.PARRAGO: {
        this.encuesta.preguntas[id].opciones = [];
        // this.agregarOpcion(id, TipoOpcionEnum.PARRAGO);
        break
      }
    }
    if (this.encuesta.preguntas[id].opciones) {
      console.log("Ultimo length de las opciones: ")
      console.log(this.encuesta.preguntas[id].opciones.length)
    }

  }

  limpiarEncuesta() {
    this.encuesta = new Encuesta();
    this.agregarPreguntaDefault();
  }

  pegarEncuesta() {
    if (sessionStorage.getItem("clipboard")){
      let encuestaNew = JSON.parse(sessionStorage.getItem("clipboard"));
      encuestaNew.categoria = encuestaNew.categoria.id;
      this.encuesta = encuestaNew
      sessionStorage.removeItem("clipboard");
    }else {
      this._snackBar.open("No tiene una encuesta valida copiada al portapapeles!", "Cerrar", {
        duration: 2000,
      });
    }
  }

  mostrarEncuesta() {
    console.log(this.encuesta)
  }
}
