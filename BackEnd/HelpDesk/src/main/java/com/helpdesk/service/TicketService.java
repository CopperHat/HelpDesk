package com.helpdesk.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.helpdesk.entity.Ticket;

public interface TicketService extends CrudService<Ticket>{

	List<Ticket> findByIdProblem(int id);
	
	List<Ticket> findByIdStaff(int id);
	
	List<Ticket> findByIdPriority(int id);
	
	List<Ticket> findByIdStatus(int id);
	
	List<Ticket> findByIdUser(int id);

	Page<Ticket> listarPageable(Pageable pageable);

	Ticket registrar(@Valid Ticket ticket);
	
	/**List<Ticket> findBySevenDays(Date date);**/
}
