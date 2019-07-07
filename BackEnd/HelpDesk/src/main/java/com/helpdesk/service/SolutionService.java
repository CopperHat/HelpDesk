package com.helpdesk.service;

import java.util.List;

import com.helpdesk.entity.Solution;

public interface SolutionService extends CrudService<Solution>{

	List<Solution> findByIdTicket(int id);
	
}
