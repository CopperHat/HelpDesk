import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { StaffSkill } from '../_model/staffSkill';

@Injectable({
  providedIn: 'root'
})
export class StaffSkillService {

  url = `${HOST}/staffSkills`;
  staffSkillsCambio = new Subject<StaffSkill[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<StaffSkill[]>(this.url);
  }

  listarStaffSkillPorId(id: number) {
    return this.http.get<StaffSkill>(`${this.url}/${id}`);
  }

  registrar(staffSkill: StaffSkill) {
    return this.http.post(this.url, staffSkill);
  }

  modificar(staffSkill: StaffSkill) {
    return this.http.put(this.url, staffSkill);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
