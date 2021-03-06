import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Solution } from 'src/app/_model/solution';
import { SolutionService } from 'src/app/_service/solution.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  dataSource: MatTableDataSource<Solution>;
  displayedColumns = ['id', 'description', 'ticketId', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  cantidad: number;

  constructor(private solutionService: SolutionService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.solutionService.solutionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.solutionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.solutionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.solutionService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
// tslint:disable-next-line: prefer-const
      let solutions = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(solutions);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idSolution: number) {
    this.solutionService.eliminar(idSolution).subscribe(data => {
// tslint:disable-next-line: no-shadowed-variable
      this.solutionService.listar().subscribe(data => {
        this.solutionService.solutionCambio.next(data);
        this.solutionService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.solutionService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
// tslint:disable-next-line: prefer-const
      let solutions = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(solutions);
      this.dataSource.sort = this.sort;
    });
  }
}
