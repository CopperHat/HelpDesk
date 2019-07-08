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
  edicion = false;
  problem: Problem;


  constructor(private route: ActivatedRoute, private router: Router,
              private problemService: ProblemService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      reportDate: new FormControl(''),
      description: new FormControl(''),
      userId: new FormControl(''),
      equipId: new FormControl('')
    });
  }

  ngOnInit() {
    this.problem = new Problem();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.problemService.listarProblemPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          reportDate: new FormControl(data.reportDate),
          description: new FormControl(data.description),
          userId: new FormControl(data.userId),
          equipId: new FormControl(data.equipId)
        });
      });
    }
  }

  operar() {
    this.problem.id = this.form.value.id;
    this.problem.reportDate = this.form.value.reportDate;
    this.problem.description = this.form.value.description;
    this.problem.userId = this.form.value.userId;
    this.problem.equipId = this.form.value.equipId;

    if (this.edicion) {
      this.problemService.modificar(this.problem).subscribe(
        data => {
          this.problemService.listar().subscribe(problems => {
            this.problemService.problemCambio.next(problems);
            this.problemService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.problemService.registrar(this.problem).subscribe(
        data => {
          this.problemService.listar().subscribe(problems => {
            this.problemService.problemCambio.next(problems);
            this.problemService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['problem']);
  }

}
