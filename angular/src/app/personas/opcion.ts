export class Opcion{
  id: number;
  texto: string;
  tipo: number;
  total: number;
}

export enum TipoOpcionEnum {
  RESPUESTA_SIMPLE = 1,
  PARRAGO = 'Parrafo',
  OPCION_MULTIPLE = 'Opcion Multiple',
  CASILLAS_DE_VERIFICACION = 'Casillas de Verificacion',
  ESCALA_LINEAL = 'Escala Lineal'
}
