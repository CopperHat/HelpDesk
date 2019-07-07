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
  displayedColumns = ['id', 'reportDate', 'description', 'userId', 'equipId', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  cantidad: number;

  constructor(private problemService: ProblemService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.problemService.problemCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.problemService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.problemService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.problemService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      const problems = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(problems);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idProblem: number) {
    this.problemService.eliminar(idProblem).subscribe(data => {
// tslint:disable-next-line: no-shadowed-variable
      this.problemService.listar().subscribe(data => {
        this.problemService.problemCambio.next(data);
        this.problemService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.problemService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      const problems = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(problems);
      this.dataSource.sort = this.sort;
    });
  }
}
