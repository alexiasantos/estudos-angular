import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    console.log(this.BASE_URL + '/users');
    return this.http.get<User[]>(this.BASE_URL + '/users', httpOptions);
    //Criando uma requisição http get que recebe uma lista do objeto tipo user, como um json. E o obsrvable verifica se esse objeto json é compativel com o objeto criado, senão dará erro.
  }
  addUser(user: any): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.BASE_URL + '/users', user, httpOptions);
    //vai pegar um objeto(json) do tipo user mandar para a rest api vai passar o header e vai receber um tipo do usuário User e se nao estiver correto ele da um erro.
  }
  editUser(user: any): Observable<User> {
    console.log(user);
    let url: string = this.BASE_URL + '/users/' + user.id;
    return this.http.put<User>(url, user, httpOptions);

  }
  deleteUser(user: any): Observable<User> {
    let url: string = this.BASE_URL + '/users/' + user.id;
    return this.http.delete<User>(url, httpOptions);
  }

}
