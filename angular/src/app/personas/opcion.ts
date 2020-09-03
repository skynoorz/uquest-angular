export class Opcion{
  id: number;
  texto: string;
  tipo: number;
  total: number;
  minValue: number;
  maxValue: number;
}

export enum TipoOpcionEnum {
  RESPUESTA_SIMPLE = 1,
  PARRAGO = 2,
  OPCION_MULTIPLE = 3,
  CASILLAS_DE_VERIFICACION = 4,
  ESCALA_LINEAL = 5
}
