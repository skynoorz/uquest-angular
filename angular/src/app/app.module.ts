import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './usuarios/form.component';
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es-BO";

registerLocaleData(localeES, 'es')

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent},
  {path: 'usuarios/form/:id', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
