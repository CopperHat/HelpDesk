package com.helpdesk.service;

import java.util.Date;
import java.util.List;

import com.helpdesk.entity.Ticket;

public interface TicketService extends CrudService<Ticket>{

	List<Ticket> findByIdProblem(int id);
	
	List<Ticket> findByIdStaff(int id);
	
	List<Ticket> findByIdPriority(int id);
	
	List<Ticket> findByIdStatus(int id);
	
	List<Ticket> findByIdUser(int id);
	
	/**List<Ticket> findBySevenDays(Date date);**/
}
