import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Equipment } from 'src/app/_model/equipment';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EquipmentService } from 'src/app/_service/equipment.service';

@Component({
  selector: 'app-equipment-edicion',
  templateUrl: './equipment-edicion.component.html',
  styleUrls: ['./equipment-edicion.component.css']
})
export class EquipmentEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  equipment: Equipment;

  constructor(private route: ActivatedRoute, private router:Router,
     private equipmentService: EquipmentService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombres':new FormControl(''),
      'apellidos':new FormControl(''),
      'dni':new FormControl(''),
      'direccion':new FormControl(''),
      'telefono':new FormControl('')
    });
  }

  ngOnInit() {
    this.equipment = new Equipment();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.equipmentService.listarEquipmentPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono)
        });
      });
    }
  }

  operar(){
    this.equipment.id=this.form.value['id'];
    this.equipment.nombres=this.form.value['nombres'];
    this.equipment.apellidos=this.form.value['apellidos'];
    this.equipment.dni=this.form.value['dni'];
    this.equipment.direccion=this.form.value['direccion'];
    this.equipment.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.equipmentService.modificar(this.equipment).subscribe(
        data=>{
          this.equipmentService.listar().subscribe(equipments =>{
            this.equipmentService.equipmentCambio.next(equipments);
            this.equipmentService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.equipmentService.registrar(this.equipment).subscribe(
        data=>{
          this.equipmentService.listar().subscribe(equipments =>{
            this.equipmentService.equipmentCambio.next(equipments);
            this.equipmentService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['equipment']);
  }

}
