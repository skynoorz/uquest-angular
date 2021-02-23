import {Categoria} from "./categoria";
import {Pregunta} from "./pregunta";
import {Persona} from "./persona";
import {Carrera} from "./carrera";

export class EncuestaUsuario{
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  createAt: string;
  fechaIni: string;
  fechaFin: string;
  categoria: Categoria;
  preguntas: Pregunta[];
  // usuario: Persona;
  usuario: Persona;
  carreras: Carrera[];
}

export enum TipoEncuestaEnum {
  ABIERTO = 'Abierto',
  CERRADO = 'Cerrado'
}
