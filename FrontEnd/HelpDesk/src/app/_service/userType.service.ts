import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { UserType } from '../_model/userType';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  url = `${HOST}/userTypes`;
  userTypeCambio = new Subject<UserType[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<UserType[]>(this.url);
  }

  listarUserTypePorId(id: number) {
    return this.http.get<UserType>(`${this.url}/${id}`);
  }

  registrar(userType: UserType) {
    return this.http.post(this.url, userType);
  }

  modificar(userType: UserType) {
    return this.http.put(this.url, userType);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
