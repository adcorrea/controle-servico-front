import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http : HttpClient) {

   }


   salvar(cliente : Cliente) : Observable<Cliente>{
      return this.http.post<Cliente>('http://localhost:8080/clientes', cliente);
   }

  getClientes () : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/clientes');
  }

  getClienteById (id : Number) : Observable<Cliente>{
    return this.http.get<Cliente>(`http://localhost:8080/clientes/${id}`);
  }
}
