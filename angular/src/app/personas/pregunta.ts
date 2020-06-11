import {Opcion} from "./opcion";

export class Pregunta{
  id: number;
  descripcion: string
  createAt: string
  tipo: string
  opciones: Opcion[]
}
