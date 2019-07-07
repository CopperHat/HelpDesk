import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { EquipType } from '../_model/equipType';

@Injectable({
  providedIn: 'root'
})
export class EquipTypeService {

  url = `${HOST}/equipTypes`;
  equipTypeCambio = new Subject<EquipType[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<EquipType[]>(this.url);
  }

  listarEquipTypePorId(id: number) {
    return this.http.get<EquipType>(`${this.url}/${id}`);
  }

  registrar(equipType: EquipType) {
    return this.http.post(this.url, equipType);
  }

  modificar(equipType: EquipType) {
    return this.http.put(this.url, equipType);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
