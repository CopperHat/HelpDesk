import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Staff } from 'src/app/_model/staff';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StaffService } from 'src/app/_service/staff.service';

@Component({
  selector: 'app-staff-edicion',
  templateUrl: './staff-edicion.component.html',
  styleUrls: ['./staff-edicion.component.css']
})
export class StaffEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  staff: Staff;

  constructor(private route: ActivatedRoute, private router:Router,
     private staffService: StaffService) {
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
    this.staff = new Staff();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.staffService.listarStaffPorId(this.id).subscribe(data => {
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
    this.staff.id=this.form.value['id'];
    this.staff.nombres=this.form.value['nombres'];
    this.staff.apellidos=this.form.value['apellidos'];
    this.staff.dni=this.form.value['dni'];
    this.staff.direccion=this.form.value['direccion'];
    this.staff.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.staffService.modificar(this.staff).subscribe(
        data=>{
          this.staffService.listar().subscribe(staffs =>{
            this.staffService.staffCambio.next(staffs);
            this.staffService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.staffService.registrar(this.staff).subscribe(
        data=>{
          this.staffService.listar().subscribe(staffs =>{
            this.staffService.staffCambio.next(staffs);
            this.staffService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['staff']);
  }

}
