import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Solution } from '../_model/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  url = `${HOST}/solutions`;
  solutionCambio = new Subject<Solution[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Solution[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Solution[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarSolutionPorId(id: number) {
    return this.http.get<Solution>(`${this.url}/${id}`);
  }

  registrar(solution: Solution) {
    return this.http.post(this.url, solution);
  }

  modificar(solution: Solution) {
    return this.http.put(this.url, solution);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
