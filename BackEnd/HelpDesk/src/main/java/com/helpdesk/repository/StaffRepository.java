package com.helpdesk.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.helpdesk.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer>{
	
	@Query("select s from Staff s inner join StaffSkill r on s.id=r.staffId where r.skillId=?1")
	List<Staff> findBySkill(int id);
}
