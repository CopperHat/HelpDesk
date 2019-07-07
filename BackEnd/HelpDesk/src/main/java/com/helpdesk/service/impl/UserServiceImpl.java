package com.helpdesk.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.helpdesk.entity.User;
import com.helpdesk.repository.UserRepository;
import com.helpdesk.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	@Override
	public User save(User u) {
		return userRepository.save(u);
	}

	@Transactional(readOnly = true)
	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Transactional
	@Override
	public User update(User u) {
		return userRepository.save(u);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}

	@Transactional
	@Override
	public void deleteById(Integer id) {
		userRepository.deleteById(id);

	}

	@Override
	public void deleteAll() {
		userRepository.deleteAll();

	}

	@Transactional(readOnly = true)
	@Override
	public List<User> findByIdUserType(int id) {
		return userRepository.findByIdUserType(id);
	}

}
