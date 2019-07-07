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
  edicion = false;
  solution: Solution;

  constructor(private route: ActivatedRoute, private router: Router,
              private solutionService: SolutionService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      description: new FormControl(''),
      ticketId: new FormControl('')
    });
  }

  ngOnInit() {
    this.solution = new Solution();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.solutionService.listarSolutionPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          description: new FormControl(data.description),
          ticketId: new FormControl(data.ticketId)
        });
      });
    }
  }

  operar() {
    this.solution.id = this.form.value.id;
    this.solution.description = this.form.value.description;
    this.solution.ticketId = this.form.value.ticketId;

    if (this.edicion) {
      this.solutionService.modificar(this.solution).subscribe(
        data => {
          this.solutionService.listar().subscribe(solutions => {
            this.solutionService.solutionCambio.next(solutions);
            this.solutionService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.solutionService.registrar(this.solution).subscribe(
        data => {
          this.solutionService.listar().subscribe(solutions => {
            this.solutionService.solutionCambio.next(solutions);
            this.solutionService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['solution']);
  }

}
