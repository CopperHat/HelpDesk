import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Ticket } from 'src/app/_model/ticket';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  dataSource: MatTableDataSource<Ticket>;
  displayedColumns=['idTicket','nombres','apellidos','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private ticketService: TicketService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.ticketService.ticketCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.ticketService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    /*this.ticketService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/

    this.ticketService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      let tickets = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(tickets);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  eliminar(idTicket: number) {
    this.ticketService.eliminar(idTicket).subscribe(data => {
      this.ticketService.listar().subscribe(data => {
        this.ticketService.ticketCambio.next(data);
        this.ticketService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.ticketService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let tickets = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(tickets);
      this.dataSource.sort = this.sort;
    });
  }
}
