import {Carrera} from "./carrera";
import {Instituto} from "./instituto";

export class Usuario{
  id: number;
  nombres: string;
  apellidoPat: string;
  apellidoMat: string;
  ci: string;
  sexo: string;
  username: string;
  password: string;
  enabled: boolean;
  fnac: string;
  email: string;
  foto: string;
  carrera: Carrera;
  instituto: Instituto
}
