package com.helpdesk.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.helpdesk.entity.Staff;

public interface StaffService extends CrudService<Staff>{
	
	List<Staff> findBySkill(int id);

	Page<Staff> listarPageable(Pageable pageable);

	Staff registrar(@Valid Staff staff);

}
