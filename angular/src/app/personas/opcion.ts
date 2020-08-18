export class Opcion{
  id: number;
  texto: string;
  tipo: string;
}

export enum TipoOpcionEnum {
  RESPUESTA_SIMPLE = 'Respuesta Simple',
  PARRAGO = 'Parrafo',
  OPCION_MULTIPLE = 'Opcion Multiple',
  CASILLAS_DE_VERIFICACION = 'Casillas de Verificacion',
  ESCALA_LINEAL = 'Escala Lineal'
}
