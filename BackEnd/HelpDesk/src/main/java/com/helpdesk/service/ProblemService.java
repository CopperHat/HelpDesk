package com.helpdesk.service;

import java.util.List;

import com.helpdesk.entity.Problem;

public interface ProblemService extends CrudService<Problem>{

	List<Problem> findByIdUser(int id);
	
	List<Problem> findByIdEquipment(int id);
}
