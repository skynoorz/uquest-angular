import {Categoria} from "./categoria";
import {Pregunta} from "./pregunta";
import {Upr} from "../classes/upr";
import {Persona} from "./persona";

export class Encuesta{
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  createAt: string;
  fechaIni: string;
  fechaFin: string;
  categoria: Categoria;
  preguntas: Pregunta[];
  upr: Upr[];
  // usuario: Persona;
  usuario: {id: number}
}

export enum TipoEncuestaEnum {
  ABIERTO = 'Abierto',
  CERRADO = 'Cerrado'
}
