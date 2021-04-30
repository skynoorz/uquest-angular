import { Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }
  public direccion: any ='Av. Villazón N° 1995, Plaza del Bicentenario - Zona Central';
  public year: number = 2021;
  public autor: any = {email: 'puras@fcpn.edu.bo', nombre:'Facultad de Ciencias Puras y Naturales', ciudad:'Ciudad de La Paz', pais:'Bolivia'}

}
