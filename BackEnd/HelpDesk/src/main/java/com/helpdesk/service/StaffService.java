package com.helpdesk.service;

import java.util.List;

import com.helpdesk.entity.Staff;

public interface StaffService extends CrudService<Staff>{
	
	List<Staff> findBySkill(int id);

}
