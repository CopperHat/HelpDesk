import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/_model/ticket';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-ticket-edicion',
  templateUrl: './ticket-edicion.component.html',
  styleUrls: ['./ticket-edicion.component.css']
})
export class TicketEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion = false;
  ticket: Ticket;

  constructor(private route: ActivatedRoute, private router: Router,
              private ticketService: TicketService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      solutionDate: new FormControl(''),
      problemId: new FormControl(''),
      priorityId: new FormControl(''),
      statusId: new FormControl(''),
      staffId: new FormControl('')
    });
  }

  ngOnInit() {
    this.ticket = new Ticket();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      // cargar la data del servicio en el form
      this.ticketService.listarTicketPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          solutionDate: new FormControl(data.solutionDate),
          problemId: new FormControl(data.problemId),
          priorityId: new FormControl(data.priorityId),
          statusId: new FormControl(data.statusId),
          staffId: new FormControl(data.staffId)
        });
      });
    }
  }

  operar() {
    this.ticket.id = this.form.value.id;
    this.ticket.solutionDate = this.form.value.solutionDate;
    this.ticket.problemId = this.form.value.problemId;
    this.ticket.priorityId = this.form.value.priorityId;
    this.ticket.statusId = this.form.value.statusId;
    this.ticket.staffId = this.form.value.staffId;

    if (this.edicion) {
      this.ticketService.modificar(this.ticket).subscribe(
        data => {
          this.ticketService.listar().subscribe(tickets => {
            this.ticketService.ticketCambio.next(tickets);
            this.ticketService.mensajeCambio.next('Se modificó');
          });
        }
      );

    } else {
      this.ticketService.registrar(this.ticket).subscribe(
        data => {
          this.ticketService.listar().subscribe(tickets => {
            this.ticketService.ticketCambio.next(tickets);
            this.ticketService.mensajeCambio.next('Se registró');
          });
        }
      );
    }
    this.router.navigate(['ticket']);
  }

}
