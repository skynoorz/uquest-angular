import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {string} from "@amcharts/amcharts4/core";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.css']
})
export class RegistrationConfirmComponent implements OnInit {

  statusMessage: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private registration: RegistrationService) {
  }

  ngOnInit(): void {
    this.validarToken();
  }

  validarToken() {
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      console.log(token);
      this.registration.validarTokenUsuario(token).subscribe(msg=>{
        // if (msg.status)
        this.statusMessage = true;
        console.log(msg.status);
      },error => {
        this.statusMessage = false;
      });
    });
  }

  redirect() {
    this.router.navigate(['/encuestas/public'])
  }
}
