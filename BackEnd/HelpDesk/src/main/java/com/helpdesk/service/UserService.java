package com.helpdesk.service;

import java.util.List;

import com.helpdesk.entity.User;

public interface UserService extends CrudService<User>{

	List<User> findByIdUserType(int id);
}
