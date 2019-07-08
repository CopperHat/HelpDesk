package com.helpdesk.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.helpdesk.entity.Problem;

public interface ProblemService extends CrudService<Problem>{

	List<Problem> findByIdUser(int id);
	
	List<Problem> findByIdProblem(Integer id);

	Page<Problem> listarPageable(Pageable pageable);

	Problem registrar(@Valid Problem problem);
}
