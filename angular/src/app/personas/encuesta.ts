import {Categoria} from "./categoria";
import {Pregunta} from "./pregunta";
import {Upr} from "../classes/upr";

export class Encuesta{
  id: number;
  titulo: string;
  tipo: string;
  createAt: string;
  fechaIni: string;
  fechaFin: string;
  categoria: Categoria;
  preguntas: Pregunta[];
  upr: Upr[];
}
