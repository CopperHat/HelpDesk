import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Problem } from '../_model/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  url = `${HOST}/problems`;
  problemCambio = new Subject<Problem[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Problem[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Problem[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarProblemPorId(id: number) {
    return this.http.get<Problem>(`${this.url}/${id}`);
  }

  registrar(problem: Problem) {
    return this.http.post(this.url, problem);
  }

  modificar(problem: Problem) {
    return this.http.put(this.url, problem);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
