import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${HOST}/users`;
  userCambio = new Subject<User[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<User[]>(this.url);
  }

  listarUserPorId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  registrar(user: User) {
    return this.http.post(this.url, user);
  }

  modificar(user: User) {
    return this.http.put(this.url, user);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
