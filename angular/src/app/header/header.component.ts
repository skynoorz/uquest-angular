import {Component, OnInit} from '@angular/core';
import {AuthService} from "../usuarios/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "UQuest FCPN";
  basePath: string = environment.basePath;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.hasFoto())
      console.log("Tiene foto")
    else
      console.log("No tiene foto")
  }

  logout(): void {
    // Swal.fire("Logout", `${this.authService.persona.username} has cerrado sesion con exito!`, "success");
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  hasFoto(): boolean {
    if (this.authService.persona?.foto != null)
      return true;
    return false;
  }
}
