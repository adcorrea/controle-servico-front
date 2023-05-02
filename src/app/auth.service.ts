import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient) { }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsername(){
    const token = this.obterToken();

    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }

    return null;
  }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');

    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }

    return null;
  }


  salvar(usuario : Usuario): Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }

  isAuthenticated(): boolean{
    const token = this.obterToken();

    if(token){
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
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
