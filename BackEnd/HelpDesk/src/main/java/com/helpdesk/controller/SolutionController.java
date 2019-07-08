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

import com.helpdesk.entity.Solution;
import com.helpdesk.exception.ResponseNotFoundException;
import com.helpdesk.service.SolutionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/solutions")
@Api(value = "REST service for solutions")
public class SolutionController {

	@Autowired
	private SolutionService solutionService;

	@ApiOperation("Return list of solutions")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Solution>> findAll() {

		List<Solution> solutions = new ArrayList<>();
		solutions = solutionService.findAll();
		return new ResponseEntity<List<Solution>>(solutions, HttpStatus.OK);
	}

	@ApiOperation("Return solution by id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Solution> findById(@PathVariable("id") Integer id) {
		Optional<Solution> solution = solutionService.findById(id);
		if (!solution.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}

		return new ResponseEntity<Solution>(solution.get(), HttpStatus.OK);
	}

	@ApiOperation("Save solution")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> save(@Valid @RequestBody Solution solution) {
		Solution solut = new Solution();
		solut = solutionService.save(solution);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(solut.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Update solution")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody Solution solution) {
		solutionService.update(solution);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@ApiOperation("Delete solution by id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@PathVariable("id") Integer id){
		Optional<Solution> solution = solutionService.findById(id);
		
		if (!solution.isPresent()) {
			throw new ResponseNotFoundException("ID: " + id);
		}else {
			solutionService.deleteById(id);
			return new ResponseEntity<>("Solution has been deleted!", HttpStatus.OK);
		}
	}
	
	@ApiOperation("Delete all solutions")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deleteAll(){
		solutionService.deleteAll();
		return new ResponseEntity<>("All solution has been deleted!",HttpStatus.OK);
	}
	
	
	@ApiOperation("Return solutions by ticket id")
	@GetMapping(value = "/ticket/{id}")
	public ResponseEntity<List<Solution>> findByIdTicket(@PathVariable("id") Integer id) {

		List<Solution> solut = solutionService.findByIdTicket(id);
		return new ResponseEntity<List<Solution>>(solut, HttpStatus.OK);
	}
	
}
