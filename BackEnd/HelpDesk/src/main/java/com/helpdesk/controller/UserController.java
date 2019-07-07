package com.helpdesk.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.helpdesk.entity.User;
import com.helpdesk.exception.ResponseNotFoundException;
import com.helpdesk.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/users")
@Api(value = "REST service for users")
public class UserController {

	@Autowired
	private UserService userService;

	@ApiOperation("Return list of users")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<User>> findAll() {

		List<User> users = new ArrayList<>();
		users = userService.findAll();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@ApiOperation("Return user by id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<User> findById(@PathVariable("id") Integer id) {
		Optional<User> user = userService.findById(id);
		if (!user.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}

		return new ResponseEntity<User>(user.get(), HttpStatus.OK);
	}

	@ApiOperation("Save user")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> save(@Valid @RequestBody User user) {
		User usr = new User();
		usr = userService.save(user);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usr.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Update user")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody User user) {
		userService.update(user);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@ApiOperation("Delete user by id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@PathVariable("id") Integer id){
		Optional<User> user = userService.findById(id);
		
		if (!user.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}else {
			userService.deleteById(id);
			return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
		}
	}
	
	@ApiOperation("Delete all users")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteAll(){
		userService.deleteAll();
		return new ResponseEntity<>("All users has been deleted!",HttpStatus.OK);
	}
	
	@ApiOperation("Return user by user type id")
	@GetMapping(value = "/type/{id}")
	public ResponseEntity<List<User>> findByIdUserType(@PathVariable("id") Integer id){
		
		List<User> users = userService.findByIdUserType(id);
		return new ResponseEntity<List<User>>(users,HttpStatus.OK);
	}
	
}
