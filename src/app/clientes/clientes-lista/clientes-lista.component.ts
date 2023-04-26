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
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  
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
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente : Cliente):void{
    this.clienteSelecionado = cliente;
  }

  deletar(cliente: Cliente):void{
    this.serviceCliente.delete(cliente)
    .subscribe(response =>{
      this.ngOnInit();
      this.mensagemSucesso = 'Cliente deletedo com sucesso!';
      this.mensagemErro = '';     
    },
            error => {

              this.mensagemErro = 'Erro ao deletar o cliente.';
              this.mensagemSucesso = ''
            });
  }

  

}
