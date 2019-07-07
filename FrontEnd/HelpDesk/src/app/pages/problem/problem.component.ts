import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Problem } from 'src/app/_model/problem';
import { ProblemService } from 'src/app/_service/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  dataSource: MatTableDataSource<Problem>;
  displayedColumns=['idProblem','nombres','apellidos','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private problemService: ProblemService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.problemService.problemCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.problemService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.problemService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.problemService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      let problems = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(problems);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  eliminar(idProblem: number) {
    this.problemService.eliminar(idProblem).subscribe(data => {
      this.problemService.listar().subscribe(data => {
        this.problemService.problemCambio.next(data);
        this.problemService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.problemService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let problems = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(problems);
      this.dataSource.sort = this.sort;
    });
  }
}
