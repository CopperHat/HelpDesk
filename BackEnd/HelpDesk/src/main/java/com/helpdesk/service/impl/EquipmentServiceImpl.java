package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Equipment;
import com.helpdesk.repository.EquipmentRepository;
import com.helpdesk.service.EquipmentService;

@Service
public class EquipmentServiceImpl implements EquipmentService {

	@Autowired
	private EquipmentRepository equipmentRepository;
	
	@Override
	public Equipment registrar(Equipment t) {		
		return equipmentRepository.save(t);
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
	
	//TODO
		@Override
		public Page<Equipment> listarPageable(Pageable pageable) {
			return equipmentRepository.findAll(pageable);
		}

}
