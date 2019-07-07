package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Problem;
import com.helpdesk.repository.ProblemRepository;
import com.helpdesk.service.ProblemService;

@Service
public class ProblemServiceImpl implements ProblemService {

	@Autowired
	private ProblemRepository problemRepository;

	@Transactional(readOnly = true)
	@Override
	public List<Problem> findAll() {

		return problemRepository.findAll();
	}

	@Transactional
	@Override
	public Problem save(Problem p) {

		return problemRepository.save(p);
	}

	@Transactional
	@Override
	public Problem update(Problem p) {
		return problemRepository.save(p);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<Problem> findById(Integer id) {
		return problemRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		problemRepository.deleteById(id);
	}

	@Override
	public void deleteAll() {
		problemRepository.deleteAll();
	}

	@Transactional(readOnly = true)
	@Override
	public List<Problem> findByIdUser(int id) {
		return problemRepository.findByIdUser(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Problem> findByIdEquipment(int id) {
		return problemRepository.findByIdEquipment(id);
	}

}
