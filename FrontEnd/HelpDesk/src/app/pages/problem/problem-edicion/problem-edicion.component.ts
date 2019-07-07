import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Problem } from 'src/app/_model/problem';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProblemService } from 'src/app/_service/problem.service';

@Component({
  selector: 'app-problem-edicion',
  templateUrl: './problem-edicion.component.html',
  styleUrls: ['./problem-edicion.component.css']
})
export class ProblemEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  problem: Problem;

  constructor(private route: ActivatedRoute, private router:Router,
     private problemService: ProblemService) {
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
    this.problem = new Problem();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.problemService.listarProblemPorId(this.id).subscribe(data => {
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
    this.problem.id=this.form.value['id'];
    this.problem.nombres=this.form.value['nombres'];
    this.problem.apellidos=this.form.value['apellidos'];
    this.problem.dni=this.form.value['dni'];
    this.problem.direccion=this.form.value['direccion'];
    this.problem.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.problemService.modificar(this.problem).subscribe(
        data=>{
          this.problemService.listar().subscribe(problems =>{
            this.problemService.problemCambio.next(problems);
            this.problemService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.problemService.registrar(this.problem).subscribe(
        data=>{
          this.problemService.listar().subscribe(problems =>{
            this.problemService.problemCambio.next(problems);
            this.problemService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['problem']);
  }

}
