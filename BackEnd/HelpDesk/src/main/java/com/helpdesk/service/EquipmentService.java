package com.helpdesk.service;

import java.util.List;

import com.helpdesk.entity.Equipment;

public interface EquipmentService extends CrudService<Equipment>{

	List<Equipment> finByIdEquipmentType(int id);
	
}
