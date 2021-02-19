import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es-BO";
// HASH import
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

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
import {MatCardModule} from '@angular/material/card';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import {EncuestasComponent} from './encuestas/encuestas.component';
import {MatExpansionModule} from "@angular/material/expansion";
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
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import { PerfilComponent } from './personas/perfil/perfil.component';
import { CopyModalComponent } from './encuestas/encuesta-listar/copy-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { StadisticsComponent } from './encuestas/stadistics/stadistics.component';
import { EditarPerfilComponent } from './personas/editar-perfil/editar-perfil.component';
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import { StadisticsPublicComponent } from './encuestas/stadistics-public/stadistics-public.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import { DialogModificarFechaComponent } from './encuestas/dialog-modificar-fecha/dialog-modificar-fecha.component';
import { CategoriasListarComponent } from './categorias/categorias-listar/categorias-listar.component';
import {MatTableModule} from "@angular/material/table";
import { CategoriasEditarComponent } from './categorias/categorias-editar/categorias-editar.component';
import { EncuestaAdminComponent } from './encuestas/encuesta-admin/encuesta-admin.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { Perfil2Component } from './personas/perfil2/perfil2.component';
import { MessagesComponent } from './messages/messages.component';
import { RegistrationConfirmComponent } from './messages/registration-confirm/registration-confirm.component';

registerLocaleData(localeES, 'es')

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'personas', component: PersonasComponent},
  {path: 'personas/page/:page', component: PersonasComponent},
  {path: 'personas/form', component: FormComponent},
  {path: 'personas/form/:id', component: EditarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'encuestas', component: EncuestasComponent},
  {path: 'encuestas/admin', component: EncuestaAdminComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  // {path: 'registro', component: RegistroComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'categorias', component: CategoriasListarComponent},
  {path: 'encuestas/crear', component: EncuestaCrearComponent},
  {path: 'encuestas/solve/:id', component: EncuestaSolveComponent },
  {path: 'encuestas/public', component: EncuestaListarComponent },
  {path: 'profile', component: PerfilComponent },
  {path: 'profile/editar/:id', component: EditarPerfilComponent },
  {path: 'stadistics/encuesta/:id', component: StadisticsComponent },
  {path: 'stadistics-public/encuesta/:id', component: StadisticsPublicComponent },
  {path: 'message/email/success', component: MessagesComponent },
  {path: 'regitrationConfirm', component: RegistrationConfirmComponent },
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
    EncuestasComponent,
    EncuestaCrearComponent,
    EditarComponent,
    EncuestaSolveComponent,
    EncuestaListarComponent,
    PerfilComponent,
    CopyModalComponent,
    StadisticsComponent,
    EditarPerfilComponent,
    StadisticsPublicComponent,
    DialogModificarFechaComponent,
    CategoriasListarComponent,
    CategoriasEditarComponent,
    EncuestaAdminComponent,
    Perfil2Component,
    MessagesComponent,
    RegistrationConfirmComponent
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
    MatRippleModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    ClipboardModule,
    NgxQRCodeModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: false}
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
