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
  edicion = false;
  staff: Staff;

  constructor(private route: ActivatedRoute, private router: Router,
              private staffService: StaffService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      firtsName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      joinDate: new FormControl(''),
      leftDate: new FormControl(''),
      maxTicket: new FormControl('')
    });
  }

  ngOnInit() {
    this.staff = new Staff();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.staffService.listarStaffPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          firtsName: new FormControl(data.firtsName),
          lastName: new FormControl(data.lastName),
          phone: new FormControl(data.phone),
          email: new FormControl(data.email),
          password: new FormControl(data.password),
          joinDate: new FormControl(data.joinDate),
          leftDate: new FormControl(data.leftDate),
          maxTicket: new FormControl(data.maxTicket)
        });
      });
    }
  }

  operar() {
    this.staff.id = this.form.value.id;
    this.staff.firtsName = this.form.value.firtsName;
    this.staff.lastName = this.form.value.lastName;
    this.staff.phone = this.form.value.phone;
    this.staff.email = this.form.value.email;
    this.staff.password = this.form.value.password;
    this.staff.joinDate = this.form.value.joinDate;
    this.staff.leftDate = this.form.value.leftDate;
    this.staff.maxTicket = this.form.value.maxTicket;

    if (this.edicion) {
      this.staffService.modificar(this.staff).subscribe(
        data => {
          this.staffService.listar().subscribe(staffs => {
            this.staffService.staffCambio.next(staffs);
            this.staffService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.staffService.registrar(this.staff).subscribe(
        data => {
          this.staffService.listar().subscribe(staffs => {
            this.staffService.staffCambio.next(staffs);
            this.staffService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['staff']);
  }

}
