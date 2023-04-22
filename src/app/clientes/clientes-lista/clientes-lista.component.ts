import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})

export class ClientesListaComponent implements OnInit{

  clientes: Cliente[] = [];
  
  constructor(
              private serviceCliente: ClientesService
              , private router : Router){}
  
  ngOnInit(): void {

    this.serviceCliente.getClientes()
                        .subscribe( response =>{
                            this.clientes = response;
                        });
   
  }

  novoCadastro():void{
    this.router.navigate(['/clientes-form']);
  }

  

}
