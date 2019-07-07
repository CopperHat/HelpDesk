package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Ticket;
import com.helpdesk.repository.TicketRepository;
import com.helpdesk.service.TicketService;

@Service
public class TicketServiceImpl implements TicketService {

	@Autowired
	private TicketRepository ticketRepository;

	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findAll() {
		return ticketRepository.findAll();
	}

	@Transactional
	@Override
	public Ticket save(Ticket t) {
		return ticketRepository.save(t);
	}

	@Transactional
	@Override
	public Ticket update(Ticket t) {
		return ticketRepository.save(t);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<Ticket> findById(Integer id) {
		return ticketRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		ticketRepository.deleteById(id);

	}

	@Override
	public void deleteAll() {
		ticketRepository.deleteAll();

	}

	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findByIdProblem(int id) {
		return ticketRepository.findByIdProblem(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findByIdStaff(int id) {
		return ticketRepository.findByIdStaff(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findByIdPriority(int id) {
		return ticketRepository.findByIdPriority(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findByIdStatus(int id) {
		return ticketRepository.findByIdStatus(id);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Ticket> findByIdUser(int id){
		return ticketRepository.findByIdUser(id);
	}
	
	/**@Transactional(readOnly = true)
	@Override
	public List<Ticket> findBySevenDays(Date date) {
		return ticketRepository.findBySevenDays(date);
	}**/

}
