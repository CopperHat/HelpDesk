import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Solution } from 'src/app/_model/solution';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SolutionService } from 'src/app/_service/solution.service';

@Component({
  selector: 'app-solution-edicion',
  templateUrl: './solution-edicion.component.html',
  styleUrls: ['./solution-edicion.component.css']
})
export class SolutionEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  solution: Solution;

  constructor(private route: ActivatedRoute, private router:Router,
     private solutionService: SolutionService) {
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
    this.solution = new Solution();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.solutionService.listarSolutionPorId(this.id).subscribe(data => {
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
    this.solution.id=this.form.value['id'];
    this.solution.nombres=this.form.value['nombres'];
    this.solution.apellidos=this.form.value['apellidos'];
    this.solution.dni=this.form.value['dni'];
    this.solution.direccion=this.form.value['direccion'];
    this.solution.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.solutionService.modificar(this.solution).subscribe(
        data=>{
          this.solutionService.listar().subscribe(solutions =>{
            this.solutionService.solutionCambio.next(solutions);
            this.solutionService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.solutionService.registrar(this.solution).subscribe(
        data=>{
          this.solutionService.listar().subscribe(solutions =>{
            this.solutionService.solutionCambio.next(solutions);
            this.solutionService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['solution']);
  }

}
