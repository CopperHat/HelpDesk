import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Staff } from 'src/app/_model/staff';
import { StaffService } from 'src/app/_service/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  dataSource: MatTableDataSource<Staff>;
  displayedColumns = ['id', 'firtsName', 'lastName', 'phone', 'email', 'joinDate', 'leftDate', 'maxTicket', 'acciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  cantidad: number;

  constructor(private staffService: StaffService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.staffService.staffCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.staffService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.staffService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.staffService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
// tslint:disable-next-line: prefer-const
      let staffs = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(staffs);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idStaff: number) {
    this.staffService.eliminar(idStaff).subscribe(data => {
// tslint:disable-next-line: no-shadowed-variable
      this.staffService.listar().subscribe(data => {
        this.staffService.staffCambio.next(data);
        this.staffService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.staffService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
// tslint:disable-next-line: prefer-const
      let staffs = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(staffs);
      this.dataSource.sort = this.sort;
    });
  }
}
