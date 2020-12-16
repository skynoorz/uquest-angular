import {Opcion} from "./opcion";

export class Pregunta{
  id: number;
  descripcion: string;
  createAt: string;
  tipo: TipoPreguntaEnum;
  opciones: Opcion[];
  required: boolean;
}

// ['Respuesta Simple', 'Parrafo', 'Opcion Multiple', 'Casillas de Verificacion', 'Escala Lineal'];
export enum TipoPreguntaEnum {
  RESPUESTA_SIMPLE = 'Respuesta Simple',
  PARRAGO = 'Parrafo',
  OPCION_MULTIPLE = 'Opcion Multiple',
  CASILLAS_DE_VERIFICACION = 'Casillas de Verificacion',
  ESCALA_LINEAL = 'Escala Lineal'
}
