import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es-BO";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PersonasComponent} from './personas/personas.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormComponent} from "./personas/form.component";
import {DetalleComponent} from "./personas/detalle/detalle.component";
import {LoginComponent} from './usuarios/login.component';
import {HomeComponent} from './home/home.component';
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthInterceptor} from "./usuarios/interceptors/auth.interceptor";
// Angular Material
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

import {MatButtonModule} from "@angular/material/button";
import {RegistroComponent} from './registro/registro.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from "@angular/material/select";

import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {ErrorStateMatcher, MatRippleModule, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {PresignComponent} from './registro/presign.component';
import {MatCardModule} from '@angular/material/card';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import {EncuestasComponent} from './encuestas/encuestas.component';
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {EncuestaCrearComponent} from './encuestas/encuesta-crear/encuesta-crear.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {EditarComponent} from './personas/editar/editar.component';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSliderModule} from "@angular/material/slider";
import { EncuestaSolveComponent } from './encuestas/encuesta-solve/encuesta-solve.component';
import { EncuestaListarComponent } from './encuestas/encuesta-listar/encuesta-listar.component';
import {MatGridListModule} from "@angular/material/grid-list";

registerLocaleData(localeES, 'es')

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'personas', component: PersonasComponent},
  {path: 'personas/page/:page', component: PersonasComponent},
  {path: 'personas/form', component: FormComponent},
  {path: 'personas/form/:id', component: EditarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'encuestas', component: EncuestasComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  // {path: 'registro', component: RegistroComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'encuestas/crear', component: EncuestaCrearComponent},
  {path: 'encuestas/solve/:id', component: EncuestaSolveComponent },
  {path: 'encuestas/public', component: EncuestaListarComponent },
  // {path: 'personas/ver/:id', component: DetalleComponent}
]

// validations config
export function minlengthValidationMessage(err, field) {
  return `Debe tener al menos ${field.templateOptions.minLength} caracteres`;
}

export function maxlengthValidationMessage(err, field) {
  return `Este valor no debe tener mas de ${field.templateOptions.maxLength} caracteres`;
}

export function minValidationMessage(err, field) {
  return `Este valor debe ser mas que ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `Este valor debe ser mas que ${field.templateOptions.max}`;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonasComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    PresignComponent,
    EncuestasComponent,
    EncuestaCrearComponent,
    EditarComponent,
    EncuestaSolveComponent,
    EncuestaListarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    FormlyModule.forRoot(
      {
        validationMessages: [
          {name: 'required', message: 'This field is required'},
          {name: 'minlength', message: minlengthValidationMessage},
          {name: 'maxlength', message: maxlengthValidationMessage},
          {name: 'min', message: minValidationMessage},
          {name: 'max', message: maxValidationMessage},
        ],
      }
    ),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSliderModule,
    MatGridListModule,
    MatRippleModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: false}
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
