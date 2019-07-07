package com.helpdesk.service;

import java.util.List;
import java.util.Optional;

public interface CrudService<T> {

	List<T> findAll();

	T save(T t);

	T update(T t);
	
	Optional<T> findById(Integer id);

	void deleteById(Integer id);
	
	void deleteAll();
	
}
