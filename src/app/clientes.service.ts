import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl: string = environment.apiUrlBase + '/api/clientes';
  headers: any ;

  constructor(private http : HttpClient) {
      this.headers = this.getHeaders;
   }

   private getHeaders(): any{
      const tokenString = localStorage.getItem('access_token');
      
      if(tokenString){
        const token = JSON.parse(tokenString.toString());
        const headers = {
          'Authorization' : 'Bearer ' + token.access_token
        }
        return headers;
      }
   }


   salvar(cliente : Cliente) : Observable<Cliente>{
      return this.http.post<Cliente>(this.apiUrl, cliente);
   }

  getClientes () : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById (id : Number) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }


  atualizar(cliente : Cliente) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
 }

 delete (cliente: Cliente) : Observable<any>{
  return this.http.delete<Cliente>(`${this.apiUrl}/${cliente.id}`);
}

}
