import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  cadastro: boolean;
  cadastroSucesso: boolean; 
  errors: string[];

  constructor(private router: Router, private authService: AuthService){

  }

  onSubmit(): void{

    this.authService.tentarLogar(this.username, this.password)
                  .subscribe(
                    response =>{
                      this.errors = [];
                      this.router.navigate(['/home']);                      
                    },
                    errorResponse => {
                      this.errors = ['Login e/ou senha incorreto(s).'];
                    }
                  )
    
  }

  preparaCadastro(event: any): void{
    event.preventDefault();
    this.cadastro = true;
  }

  cancelaCadastro(): void{
    this.cadastro = false;
  }

  cadastrar(): void{
    let usuario: Usuario = new Usuario();
   
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
      .subscribe(
        response =>{
          this.cadastroSucesso = true;
          this.cadastro = false;
          this.username = '';
          this.password = '';
          this.errors = [];
        },
        errors => {
          this.cadastroSucesso = false;
          this.errors = errors.error.errors;
        }
      )
  }

}
