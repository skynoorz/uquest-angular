import {Categoria} from "./categoria";
import {Pregunta} from "./pregunta";
import {Persona} from "./persona";

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
}

export enum TipoEncuestaEnum {
  ABIERTO = 'Abierto',
  CERRADO = 'Cerrado'
}
