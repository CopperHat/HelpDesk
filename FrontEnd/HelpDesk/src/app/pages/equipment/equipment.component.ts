import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Equipment } from 'src/app/_model/equipment';
import { EquipmentService } from 'src/app/_service/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  dataSource: MatTableDataSource<Equipment>;
  displayedColumns=['idEquipment','nombres','apellidos','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private equipmentService: EquipmentService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.equipmentService.equipmentCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.equipmentService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.equipmentService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.equipmentService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      let equipments = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(equipments);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  eliminar(idEquipment: number) {
    this.equipmentService.eliminar(idEquipment).subscribe(data => {
      this.equipmentService.listar().subscribe(data => {
        this.equipmentService.equipmentCambio.next(data);
        this.equipmentService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.equipmentService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let equipments = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(equipments);
      this.dataSource.sort = this.sort;
    });
  }
}
