import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Staff } from '../_model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  url = `${HOST}/staffs`;
  staffCambio = new Subject<Staff[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Staff[]>(this.url);
  }

  listarStaffPorId(id: number) {
    return this.http.get<Staff>(`${this.url}/${id}`);
  }

  registrar(staff: Staff) {
    return this.http.post(this.url, staff);
  }

  modificar(staff: Staff) {
    return this.http.put(this.url, staff);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
