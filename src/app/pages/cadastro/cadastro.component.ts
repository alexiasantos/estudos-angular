import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/comum/validador';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {

  user: User = new User();
  addressForm = this.fb.group({

    name: [null, Validators.compose([
      Validators.required, Validators.minLength(3), Validators.maxLength(70)])
    ],
    email: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email])
    ],
    cpf: [null, Validators.compose([
      Validators.required, GenericValidator.isValidCpf()])
    ],
    phone: [null, Validators.required],
    dataNascimento: [null, Validators.required],
    password: [null, Validators.required],
  });

  email = this.addressForm.controls['email'];

  constructor(private fb: FormBuilder, private service: UserService) {
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'O email é obrigatório';
    }
    return this.email.hasError('email') ? 'Você deve preencher um valor para o email válido' : '';
  }


  onSubmit(): void {
    if (this.addressForm.controls['name'].value) {
      this.user.name = this.addressForm.controls['name'].value;
    }
    if (this.addressForm.controls['email'].value) {
      this.user.email = this.addressForm.controls['email'].value;
    }

    if (this.addressForm.controls['phone'].value) {
      this.user.phone = this.addressForm.controls['phone'].value;
    }
    if (this.addressForm.controls['cpf'].value) {
      this.user.cpf = this.addressForm.controls['cpf'].value;
    }
    if (this.addressForm.controls['dataNascimento'].value) {
      this.user.dataNascimento = this.addressForm.controls['dataNascimento'].value;
    }
    if (this.addressForm.controls['password'].value) {
      this.user.password = this.addressForm.controls['password'].value;
    }

    console.log(this.user);
    // localStorage.setItem('user', JSON.stringify(this.user));
    // Estamos pegando o objeto que tem na memória, serializando para um objeto JSON e salvando como string no localStorage
    this.service.addUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        alert('Dado registrado com sucesso')
      },
      error: (erro: any) => {
        console.log(erro)
        alert('ocorreu um erro!');
      }
    })
  }
}
