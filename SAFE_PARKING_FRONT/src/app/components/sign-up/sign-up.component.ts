import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { Observable, Observer } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

export interface ExampleTab {
  label: string;
  content: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' },
        ]);
      }, 1000);
    });
  }
}
