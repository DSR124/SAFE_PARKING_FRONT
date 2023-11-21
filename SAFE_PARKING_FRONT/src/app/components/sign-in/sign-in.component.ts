import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) {}

  username: string = '';
  password: string = '';
  mensaje: string = '';
  role: string = '';
  hide: boolean = true; // or initialize it as per your requirement
  loading: boolean = false;

  ngAfterViewInit() {
    // Inicializa el indicador de carga como falso
    this.loading = false;
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;

    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.verificar();

        if (this.role == 'administrador') {
          this.router.navigate(['components/home_administrador']);
        } else if (this.role == 'arrendador') {
          this.router.navigate(['components/home_arrendador']);
        } else if (this.role == 'conductor') {
          this.router.navigate(['components/home_conductor']);
        }

        // Simula una demora de 2000 milisegundos antes de ocultar la interfaz de carga
        /*
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        */
      },
      (error) => {
        this.loading = false; // Oculta la interfaz de carga en caso de error
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
}
