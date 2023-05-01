import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from './login/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrlBase + '/api/usuarios';
  tokenUrl: string = environment.apiUrlBase + environment.tokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(private http : HttpClient) { }

  salvar(usuario : Usuario): Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(username:string, password: string): Observable<any>{
    let params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password');

    let headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenUrl, params.toString(), { headers });
  }
}
