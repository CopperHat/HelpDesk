import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Equipment } from '../_model/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  url = `${HOST}/equipments/`;
  equipmentCambio = new Subject<Equipment[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Equipment[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<Equipment[]>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarEquipmentPorId(id: number) {
    return this.http.get<Equipment>(`${this.url}/${id}`);
  }

  registrar(equipment: Equipment) {
    return this.http.post(this.url, equipment);
  }

  modificar(equipment: Equipment) {
    return this.http.put(this.url, equipment);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
