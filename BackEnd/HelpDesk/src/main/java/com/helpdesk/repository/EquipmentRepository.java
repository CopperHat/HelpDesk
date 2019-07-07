package com.helpdesk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.helpdesk.entity.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Integer>{

	@Query("select e from Equipment e where e.equipTypeId.id=?1")
	List<Equipment> findByIdEquipmentType(int id);
	
}
