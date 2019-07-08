package com.helpdesk.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.helpdesk.entity.Solution;

public interface SolutionService extends CrudService<Solution>{

	List<Solution> findByIdTicket(int id);

	Page<Solution> listarPageable(Pageable pageable);

	Solution registrar(@Valid Solution solution);
	
}
