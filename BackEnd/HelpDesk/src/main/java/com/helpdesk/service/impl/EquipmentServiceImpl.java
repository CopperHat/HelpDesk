package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Equipment;
import com.helpdesk.repository.EquipmentRepository;
import com.helpdesk.service.EquipmentService;

@Service
public class EquipmentServiceImpl implements EquipmentService {

	@Autowired
	private EquipmentRepository equipmentRepository;

	@Transactional(readOnly = true)
	@Override
	public List<Equipment> findAll() {
		return equipmentRepository.findAll();
	}

	@Transactional
	@Override
	public Equipment save(Equipment e) {
		return equipmentRepository.save(e);
	}

	@Transactional
	@Override
	public Equipment update(Equipment e) {

		return equipmentRepository.save(e);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<Equipment> findById(Integer id) {
		return equipmentRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		equipmentRepository.deleteById(id);
	}

	@Override
	public void deleteAll() {
		equipmentRepository.deleteAll();
	}

	@Transactional(readOnly = true)
	@Override
	public List<Equipment> finByIdEquipmentType(int id) {
		return equipmentRepository.findByIdEquipmentType(id);
	}

}
