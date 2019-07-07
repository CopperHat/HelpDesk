import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Skill } from '../_model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  url = `${HOST}/skills`;
  skillCambio = new Subject<Skill[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Skill[]>(this.url);
  }

  listarSkillPorId(id: number) {
    return this.http.get<Skill>(`${this.url}/${id}`);
  }

  registrar(skill: Skill) {
    return this.http.post(this.url, skill);
  }

  modificar(skill: Skill) {
    return this.http.put(this.url, skill);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
