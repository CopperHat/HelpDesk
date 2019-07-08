package com.helpdesk.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CrudService<T> {

	T registrar(@Valid T t);

	T update(T t);
	
	Optional<T> findById(Integer id);
	
	Page<T> listarPageable(Pageable pageable);

	void deleteById(Integer id);
	
	void deleteAll();
	
}
