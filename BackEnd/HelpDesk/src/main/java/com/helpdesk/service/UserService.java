package com.helpdesk.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.helpdesk.entity.User;

public interface UserService extends CrudService<User>{

	List<User> findByIdUserType(int id);

	Page<User> listarPageable(Pageable pageable);

	User registrar(@Valid User user);
}
