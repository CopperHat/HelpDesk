import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Status } from '../_model/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  url = `${HOST}/statuss`;
  statusCambio = new Subject<Status[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Status[]>(this.url);
  }

  listarStatusPorId(id: number) {
    return this.http.get<Status>(`${this.url}/${id}`);
  }

  registrar(status: Status) {
    return this.http.post(this.url, status);
  }

  modificar(status: Status) {
    return this.http.put(this.url, status);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
