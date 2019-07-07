package com.helpdesk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.helpdesk.entity.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer>{

	@Query("select t from Ticket t where t.problemId.id=?1")
	List<Ticket> findByIdProblem(int id);
	
	@Query("select t from Ticket t where t.staffId.id=?1")
	List<Ticket> findByIdStaff(int id);
	
	@Query("select t from Ticket t where t.priorityId.id=?1")
	List<Ticket> findByIdPriority(int id);
	
	@Query("select t from Ticket t where t.statusId.id=?1")
	List<Ticket> findByIdStatus(int id);
	
	@Query("select t from Ticket t inner join Problem p on t.problemId=p.id inner join User u on p.userId=u.id where u.id=?1")
	List<Ticket> findByIdUser(int id);
	
	/**@Query("select t from Ticket t inner join Problem p on p.d=t.problemId where p.reportDate-date=>'7 days'")
	List<Ticket> findBySevenDays(Date date);**/
}
