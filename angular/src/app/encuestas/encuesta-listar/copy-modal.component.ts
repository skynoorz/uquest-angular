import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-copy-modal',
  templateUrl: './copy-modal.component.html',
  styleUrls: ['./copy-modal.component.css']
})
export class CopyModalComponent implements OnInit {

  title='Copiar URL';

  url = environment.basePath + this.data.address;
  // url = `http://localhost:4200`+this.data.address;
  elementType = NgxQrcodeElementTypes.URL;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = this.url;

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: EncuestaListarComponent,
    @Inject(MAT_DIALOG_DATA) public data: { address: string} ,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getPath(): string{
    return environment.basePath+this.data.address;
  }
}
