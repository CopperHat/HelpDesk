package com.helpdesk.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tickets")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date solutionDate;
	
	@ManyToOne	
	@JoinColumn(name = "problem_id", nullable = false)
	private Problem problemId;
	
	@ManyToOne	
	@JoinColumn(name = "priority_id", nullable = false)
	private Priority priorityId;
	
	@ManyToOne	
	@JoinColumn(name = "status_id", nullable = false)
	private Status statusId;
	
	@ManyToOne	
	@JoinColumn(name = "staff_id", nullable = false)
	private Staff staffId;

	/**@PrePersist
	public void createFecha() {
		solutionDate = new Date();
	}**/
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getSolutionDate() {
		return solutionDate;
	}

	public void setSolutionDate(Date solutionDate) {
		this.solutionDate = solutionDate;
	}

	public Problem getProblemId() {
		return problemId;
	}

	public void setProblemId(Problem problemId) {
		this.problemId = problemId;
	}

	public Priority getPriorityId() {
		return priorityId;
	}

	public void setPriorityId(Priority priorityId) {
		this.priorityId = priorityId;
	}

	public Status getStatusId() {
		return statusId;
	}

	public void setStatusId(Status statusId) {
		this.statusId = statusId;
	}

	public Staff getStaffId() {
		return staffId;
	}

	public void setStaffId(Staff staffId) {
		this.staffId = staffId;
	}

}
