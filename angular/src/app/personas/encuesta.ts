import {Categoria} from "./categoria";
import {Pregunta} from "./pregunta";

export class Encuesta{
  id: number;
  titulo: string;
  tipo: string;
  createAt: string;
  fechaIni: string;
  fechaFin: string;
  categoria: Categoria;
  preguntas: Pregunta[];
}
