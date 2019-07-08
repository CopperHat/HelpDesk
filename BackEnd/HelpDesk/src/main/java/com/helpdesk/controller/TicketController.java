package com.helpdesk.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.helpdesk.entity.Ticket;
import com.helpdesk.exception.ResponseNotFoundException;
import com.helpdesk.service.TicketService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/tickets")
@Api(value = "REST service for tickets")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@ApiOperation("Return list of tickets")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Ticket>> findAll() {

		List<Ticket> tickets = new ArrayList<>();
		tickets = ticketService.findAll();
		return new ResponseEntity<List<Ticket>>(tickets, HttpStatus.OK);
	}

	@ApiOperation("Return ticket by id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Ticket> findById(@PathVariable("id") Integer id) {
		Optional<Ticket> ticket = ticketService.findById(id);
		if (!ticket.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}

		return new ResponseEntity<Ticket>(ticket.get(), HttpStatus.OK);
	}

	@ApiOperation("Save ticket")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> save(@Valid @RequestBody Ticket ticket) {
		Ticket tick = new Ticket();
		tick = ticketService.save(ticket);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(tick.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Update ticket")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody Ticket ticket) {
		ticketService.update(ticket);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@ApiOperation("Delete ticket by id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@PathVariable("id") Integer id){
		Optional<Ticket> ticket = ticketService.findById(id);
		
		if (!ticket.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}else {
			ticketService.deleteById(id);
			return new ResponseEntity<>("Ticket has been deleted!", HttpStatus.OK);
		}
	}
	
	@ApiOperation("Delete all tickets")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteAll(){
		ticketService.deleteAll();
		return new ResponseEntity<>("All tickets has been deleted!",HttpStatus.OK);
	}
	
	@ApiOperation("Return ticket by id problem")
	@GetMapping(value = "/problem/{id}")
	public ResponseEntity<List<Ticket>> findByIdProblem(@PathVariable("id") Integer id){
		
		List<Ticket> tickets = ticketService.findByIdProblem(id);
		return new ResponseEntity<List<Ticket>>(tickets,HttpStatus.OK);
	}
	
	@ApiOperation("Return ticket by id staff")
	@GetMapping(value = "/staff/{id}")
	public ResponseEntity<List<Ticket>> findByIdStaff(@PathVariable("id") Integer id){
		
		List<Ticket> tickets = ticketService.findByIdStaff(id);
		return new ResponseEntity<List<Ticket>>(tickets,HttpStatus.OK);
	}
	
	@ApiOperation("Return ticket by priority")
	@GetMapping(value = "/priority/{id}")
	public ResponseEntity<List<Ticket>> findByIdPriority(@PathVariable("id") Integer id){
		
		List<Ticket> tickets = ticketService.findByIdPriority(id);
		return new ResponseEntity<List<Ticket>>(tickets,HttpStatus.OK);
	}
	
	@ApiOperation("Return ticket by status")
	@GetMapping(value = "/status/{id}")
	public ResponseEntity<List<Ticket>> findByIdStatus(@PathVariable("id") Integer id){
		
		List<Ticket> tickets = ticketService.findByIdStatus(id);
		return new ResponseEntity<List<Ticket>>(tickets,HttpStatus.OK);
	}
	
	@ApiOperation("Return ticket by user")
	@GetMapping(value = "/user/{id}")
	public ResponseEntity<List<Ticket>> findByIdUser(@PathVariable("id") Integer id){
		
		List<Ticket> tickets = ticketService.findByIdUser(id);
		return new ResponseEntity<List<Ticket>>(tickets,HttpStatus.OK);
	}
	
}
