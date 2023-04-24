import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './ServicoPrestadoBusca';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit{

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];
  message: string;

  constructor(private servicoPrestadoService: ServicoPrestadoService) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
  }

  consultar():void{
    this.servicoPrestadoService.buscar(this.nome, this.mes)
      .subscribe(
        response => {
            console.log(response);
            this.lista = response;

            this.message = "";

            if(this.lista.length <= 0){
              this.message = "Nenhum serviço encontrado."
            }
        },
        errorResponse => {

        }
      );
  }

}
