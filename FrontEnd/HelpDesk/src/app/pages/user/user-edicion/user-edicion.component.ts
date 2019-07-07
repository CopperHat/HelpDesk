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
  edicion: boolean = false;
  user: User;

  constructor(private route: ActivatedRoute, private router:Router,
     private userService: UserService) {
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
    this.user = new User();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.userService.listarUserPorId(this.id).subscribe(data => {
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
    this.user.id=this.form.value['id'];
    this.user.nombres=this.form.value['nombres'];
    this.user.apellidos=this.form.value['apellidos'];
    this.user.dni=this.form.value['dni'];
    this.user.direccion=this.form.value['direccion'];
    this.user.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.userService.modificar(this.user).subscribe(
        data=>{
          this.userService.listar().subscribe(users =>{
            this.userService.userCambio.next(users);
            this.userService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.userService.registrar(this.user).subscribe(
        data=>{
          this.userService.listar().subscribe(users =>{
            this.userService.userCambio.next(users);
            this.userService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['user']);
  }

}
