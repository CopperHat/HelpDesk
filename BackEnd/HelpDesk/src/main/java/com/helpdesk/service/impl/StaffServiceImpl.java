package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Staff;
import com.helpdesk.repository.StaffRepository;
import com.helpdesk.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {

	@Autowired
	private StaffRepository staffRepository;

	@Transactional(readOnly = true)
	@Override
	public List<Staff> findAll() {
		return staffRepository.findAll();
	}

	@Transactional
	@Override
	public Staff save(Staff s) {

		return staffRepository.save(s);
	}

	@Transactional
	@Override
	public Staff update(Staff s) {

		return staffRepository.save(s);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<Staff> findById(Integer id) {
		return staffRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		staffRepository.deleteById(id);

	}

	@Override
	public void deleteAll() {

		staffRepository.deleteAll();
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Staff> findBySkill(int id){
		return staffRepository.findBySkill(id);
	}

}
