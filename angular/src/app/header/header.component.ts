import { Component, OnInit } from '@angular/core';
import {AuthService} from "../usuarios/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  title: string = "UQuest FCPN";

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout():void {
    Swal.fire("Logout",`${this.authService.persona.username} has cerrado sesion con exito!`, "success");
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
