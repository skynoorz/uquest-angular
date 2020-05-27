import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es-BO";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormComponent } from './usuarios/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { DetalleComponent } from './usuarios/detalle/detalle.component';

registerLocaleData(localeES, 'es')

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/page/:page', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent},
  {path: 'usuarios/form/:id', component: FormComponent},
  // {path: 'usuarios/ver/:id', component: DetalleComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
