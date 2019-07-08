import { EquipType } from './../../../_model/equipType';
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
  edicion = false;
  equipment: Equipment;

  equipType: EquipType[] = [
    {id: 1, description: 'Computadora'},
    {id: 2, description: 'Laptop'},
    {id: 3, description: 'Ipad'}
  ];

  constructor(private route: ActivatedRoute, private router: Router,
              private equipmentService: EquipmentService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      acquisitionDated: new FormControl(''),
      retirementDate: new FormControl(''),
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      manufactureName: new FormControl(''),
      otherDetails: new FormControl(''),
      equipTypeId: new FormControl('')
    });
  }

  ngOnInit() {
    this.equipment = new Equipment();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.equipmentService.listarEquipmentPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          acquisitionDated: new FormControl(data.acquisitionDated),
          retirementDate: new FormControl(data.retirementDate),
          code: new FormControl(data.code),
          name: new FormControl(data.name),
          description: new FormControl(data.description),
          manufactureName: new FormControl(data.manufactureName),
          otherDetails: new FormControl(data.otherDetails),
          equipTypeId: new FormControl(data.equipTypeId)
        });
      });
    }
  }

  operar() {
    this.equipment.id = this.form.value.id;
    this.equipment.acquisitionDated = this.form.value.acquisitionDated;
    this.equipment.retirementDate = this.form.value.retirementDate;
    this.equipment.code = this.form.value.code;
    this.equipment.name = this.form.value.name;
    this.equipment.description = this.form.value.description;
    this.equipment.manufactureName = this.form.value.manufactureName;
    this.equipment.otherDetails = this.form.value.otherDetails;
    this.equipment.equipTypeId = this.form.value.equipTypeId;

    if (this.edicion) {
      this.equipmentService.modificar(this.equipment).subscribe(
        data => {
          this.equipmentService.listar().subscribe(equipments => {
            this.equipmentService.equipmentCambio.next(equipments);
            this.equipmentService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.equipmentService.registrar(this.equipment).subscribe(
        data => {
          this.equipmentService.listar().subscribe(equipments => {
            this.equipmentService.equipmentCambio.next(equipments);
            this.equipmentService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['equipment']);
  }

}
