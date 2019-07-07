package com.helpdesk.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "problems")
public class Problem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne	
	@JoinColumn(name = "user_id", nullable = false)
	private User userId;
	
	@ManyToOne	
	@JoinColumn(name = "equip_id", nullable = false)
	private Equipment equipId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date reportDate;
	
	@Size(max = 400, message = "Description must be 400 characters as max")
	@Column(name = "description", nullable = false, length = 400)
	private String description;

	/**@PrePersist
	public void createFecha() {
		reportDate=new Date();
	}**/
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Equipment getEquipId() {
		return equipId;
	}

	public void setEquipId(Equipment equipId) {
		this.equipId = equipId;
	}

	public Date getReportDate() {
		return reportDate;
	}

	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
