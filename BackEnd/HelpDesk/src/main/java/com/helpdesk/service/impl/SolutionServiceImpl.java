package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.Solution;
import com.helpdesk.repository.SolutionRepository;
import com.helpdesk.service.SolutionService;

@Service
public class SolutionServiceImpl implements SolutionService {

	@Autowired
	private SolutionRepository solutionRepository;

	@Override
	public Solution registrar(Solution t) {		
		return solutionRepository.save(t);
	}

	@Transactional
	@Override
	public Solution update(Solution s) {

		return solutionRepository.save(s);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<Solution> findById(Integer id) {
		return solutionRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		solutionRepository.deleteById(id);
	}

	@Override
	public void deleteAll() {
		solutionRepository.deleteAll();
	}

	@Transactional(readOnly = true)
	@Override
	public List<Solution> findByIdTicket(int id) {
		return solutionRepository.findByIdTicket(id);
	}

	//TODO
		@Override
		public Page<Solution> listarPageable(Pageable pageable) {
			return solutionRepository.findAll(pageable);
		}

}
