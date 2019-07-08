package com.helpdesk.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.helpdesk.entity.Problem;
import com.helpdesk.exception.ResponseNotFoundException;
import com.helpdesk.service.ProblemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/problems")
@Api(value = "REST service for problems")
public class ProblemController {

	@Autowired
	private ProblemService problemService;
	
	@ApiOperation("Return problem by id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Problem> findById(@PathVariable("id") Integer id) {
		Optional<Problem> problem = problemService.findById(id);
		if (!problem.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}

		return new ResponseEntity<Problem>(problem.get(), HttpStatus.OK);
	}
	
	@GetMapping(value="/pageable", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Problem>> listarPageable(Pageable pageable){
		Page<Problem> problems;
		problems = problemService.listarPageable(pageable);
		return new ResponseEntity<Page<Problem>>(problems, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Problem> registrar(@Valid @RequestBody Problem problem){
		Problem problemNew = new Problem();
		problemNew = problemService.registrar(problem);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(problemNew.getId()).toUri();
		return ResponseEntity.created(location).build();		
	}

	@ApiOperation("Update problem")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody Problem problem) {
		problemService.update(problem);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@ApiOperation("Delete problem by id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@PathVariable("id") Integer id){
		Optional<Problem> problem = problemService.findById(id);
		
		if (!problem.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}else {
			problemService.deleteById(id);
			return new ResponseEntity<>("Problem has been deleted!", HttpStatus.OK);
		}
	}
	
	@ApiOperation("Delete all problems")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteAll(){
		problemService.deleteAll();
		return new ResponseEntity<>("All problems has been deleted!",HttpStatus.OK);
	}
	
	@ApiOperation("Return user by equipement id")
	@GetMapping(value = "/equip/{id}")
	public ResponseEntity<List<Problem>> findByIdProblem(@PathVariable("id") Integer id){
		
		List<Problem> probl = problemService.findByIdProblem(id);
		return new ResponseEntity<List<Problem>>(probl,HttpStatus.OK);
	}
	
	@ApiOperation("Return user by user id")
	@GetMapping(value = "/user/{id}")
	public ResponseEntity<List<Problem>> findByIdUser(@PathVariable("id") Integer id){
		
		List<Problem> probl = problemService.findByIdUser(id);
		return new ResponseEntity<List<Problem>>(probl,HttpStatus.OK);
	}
	
}
