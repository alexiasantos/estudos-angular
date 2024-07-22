import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AutorizacaoService } from 'src/app/services/autorizacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // private fb = inject(FormBuilder);
  addressForm = this.fb.group({

    email: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    ],
    password: ['', Validators.required]
  });


  constructor(private autorizacaoService: AutorizacaoService, private fb: FormBuilder) { }
  loginClick() {
    if (this.autorizacaoService.obterLoginStatus())
      this.autorizacaoService.deslogar();
    else
      this.autorizacaoService.autorizar();
  }
  onSubmit(): void {
    this.loginClick();
    alert('Thanks!');
  }
}
