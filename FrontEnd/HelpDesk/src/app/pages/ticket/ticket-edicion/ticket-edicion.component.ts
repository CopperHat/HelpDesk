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
  edicion: boolean = false;
  ticket: Ticket;

  constructor(private route: ActivatedRoute, private router:Router,
     private ticketService: TicketService) {
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
    this.ticket = new Ticket();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }


  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.ticketService.listarTicketPorId(this.id).subscribe(data => {
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
    this.ticket.id=this.form.value['id'];
    this.ticket.nombres=this.form.value['nombres'];
    this.ticket.apellidos=this.form.value['apellidos'];
    this.ticket.dni=this.form.value['dni'];
    this.ticket.direccion=this.form.value['direccion'];
    this.ticket.telefono=this.form.value['telefono'];

    if(this.edicion){
      this.ticketService.modificar(this.ticket).subscribe(
        data=>{
          this.ticketService.listar().subscribe(tickets =>{
            this.ticketService.ticketCambio.next(tickets);
            this.ticketService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.ticketService.registrar(this.ticket).subscribe(
        data=>{
          this.ticketService.listar().subscribe(tickets =>{
            this.ticketService.ticketCambio.next(tickets);
            this.ticketService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['ticket']);
  }

}
