package com.helpdesk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.helpdesk.entity.Problem;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Integer>{
	
	@Query("select p from Problem p where p.userId.id=?1")
	List<Problem> findByIdUser(int id);
	
	@Query("select p from Problem p where p.equipId.id=?1")
	List<Problem> findByIdEquipment(int id);
}
