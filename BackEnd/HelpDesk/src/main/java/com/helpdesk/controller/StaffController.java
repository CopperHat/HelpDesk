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

import com.helpdesk.entity.Staff;
import com.helpdesk.exception.ResponseNotFoundException;
import com.helpdesk.service.StaffService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/staff")
@Api(value = "REST service for staff")
public class StaffController {

	@Autowired
	private StaffService staffService;

	@ApiOperation("Return list of staff")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Staff>> findAll() {

		List<Staff> staffs = new ArrayList<>();
		staffs = staffService.findAll();
		return new ResponseEntity<List<Staff>>(staffs, HttpStatus.OK);
	}

	@ApiOperation("Return staff by id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Staff> findById(@PathVariable("id") Integer id) {
		Optional<Staff> staff = staffService.findById(id);
		if (!staff.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}

		return new ResponseEntity<Staff>(staff.get(), HttpStatus.OK);
	}

	@ApiOperation("Save staff")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> save(@Valid @RequestBody Staff staff) {
		Staff stff = new Staff();
		stff = staffService.save(staff);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(stff.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Update staff")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody Staff staff) {
		staffService.update(staff);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@ApiOperation("Delete staff by id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@PathVariable("id") Integer id){
		Optional<Staff> staff = staffService.findById(id);
		
		if (!staff.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}else {
			staffService.deleteById(id);
			return new ResponseEntity<>("Staff has been deleted!", HttpStatus.OK);
		}
	}
	
	@ApiOperation("Delete all staff")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteAll(){
		staffService.deleteAll();
		return new ResponseEntity<>("All staff has been deleted!",HttpStatus.OK);
	}
	
	@ApiOperation("Return staff by skill")
	@GetMapping(value = "/skill/{id}")
	public ResponseEntity<List<Staff>> findBySkill(@PathVariable("id") Integer id){
		
		List<Staff> staffs = staffService.findBySkill(id);
		return new ResponseEntity<List<Staff>>(staffs,HttpStatus.OK);
	}
	
}
