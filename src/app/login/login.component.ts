import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router){

  }

  onSubmit(): void{
    this.router.navigate(['/home']);
  }

  preparaCadastro(event: any): void{
    event.preventDefault();
    this.cadastro = true;
  }

  cancelaCadastro(): void{
    this.cadastro = false;
  }

}
