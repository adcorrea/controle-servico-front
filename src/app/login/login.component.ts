import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean;
  cadastro: boolean;
  cadastroSucesso: boolean; 
  errors: string[];

  constructor(private router: Router, private authService: AuthService){
         
  }

  ngOnInit(): void {
     if(this.authService.isAuthenticated()){
        this.router.navigate(['/home']);
      }  
  }

  onSubmit(): void{

    this.authService.tentarLogar(this.username, this.password)
                  .subscribe(
                    response =>{
                      this.errors = [];
                      const accessToken = JSON.stringify(response);
                      localStorage.setItem('access_token', accessToken);
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
