import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/_model/user';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-user-edicion',
  templateUrl: './user-edicion.component.html',
  styleUrls: ['./user-edicion.component.css']
})
export class UserEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion = false;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      firtsName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),
      userTypeId: new FormControl('')
    });
  }

  ngOnInit() {
    this.user = new User();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.userService.listarUserPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          firtsName: new FormControl(data.firtsName),
          lastName: new FormControl(data.lastName),
          email: new FormControl(data.email),
          password: new FormControl(data.password),
          phone: new FormControl(data.phone),
          userTypeId: new FormControl(data.userTypeId)
        });
      });
    }
  }

  operar() {
    this.user.id = this.form.value.id;
    this.user.firtsName = this.form.value.firtsName;
    this.user.lastName = this.form.value.lastName;
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.user.phone = this.form.value.phone;

    if (this.edicion) {
      this.userService.modificar(this.user).subscribe(
        data => {
          this.userService.listar().subscribe(users => {
            this.userService.userCambio.next(users);
            this.userService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.userService.registrar(this.user).subscribe(
        data => {
          this.userService.listar().subscribe(users => {
            this.userService.userCambio.next(users);
            this.userService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['user']);
  }

}
