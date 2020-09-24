import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EncuestaListarComponent} from "./encuesta-listar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-copy-modal',
  templateUrl: './copy-modal.component.html',
  styleUrls: ['./copy-modal.component.css']
})
export class CopyModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: EncuestaListarComponent,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getPath(): string{
    return `http://localhost:4200`+this.data.address;
  }
}
