package com.helpdesk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.helpdesk.entity.Solution;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Integer>{

	@Query("select s from Solution s where s.ticketId.id=?1")
	List<Solution> findByIdTicket(int id);
	
}
