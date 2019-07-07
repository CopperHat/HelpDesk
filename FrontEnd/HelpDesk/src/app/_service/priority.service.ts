import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Priority } from './../_model/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  url = `${HOST}/prioritys`;
  priorityCambio = new Subject<Priority[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Priority[]>(this.url);
  }

  listarPriorityPorId(id: number) {
    return this.http.get<Priority>(`${this.url}/${id}`);
  }

  registrar(priority: Priority) {
    return this.http.post(this.url, priority);
  }

  modificar(priority: Priority) {
    return this.http.put(this.url, priority);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
