import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Ticket } from '../_model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url = `${HOST}/tickets`;
  ticketCambio = new Subject<Ticket[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Ticket[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Ticket[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarTicketPorId(id: number) {
    return this.http.get<Ticket>(`${this.url}/${id}`);
  }

  registrar(ticket: Ticket) {
    return this.http.post(this.url, ticket);
  }

  modificar(ticket: Ticket) {
    return this.http.put(this.url, ticket);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
