package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Problem;
import com.helpdesk.repository.ProblemRepository;
import com.helpdesk.service.ProblemService;

@Service
public class ProblemServiceImpl implements ProblemService {

	@Autowired
	private ProblemRepository problemRepository;
	
	@Override
	public Problem registrar(Problem t) {		
		return problemRepository.save(t);
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
	
	@Override
	public List<Problem> findByIdProblem(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	//TODO
		@Override
		public Page<Problem> listarPageable(Pageable pageable) {
			return problemRepository.findAll(pageable);
		}	
}
