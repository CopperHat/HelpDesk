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
@Table(name = "staffSkills")
public class StaffSkill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "staff_id", nullable = false)
	private Staff staffId;

	@ManyToOne
	@JoinColumn(name = "skill_id", nullable = false)
	private Skill skillId;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date getDate;
	
	/**@PrePersist
	public void createFecha() {
		getDate = new Date();
	}**/

	public Staff getStaffId() {
		return staffId;
	}

	public void setStaffId(Staff staffId) {
		this.staffId = staffId;
	}

	public Skill getSkillId() {
		return skillId;
	}

	public void setSkillId(Skill skillId) {
		this.skillId = skillId;
	}

	public Date getGetDate() {
		return getDate;
	}

	public void setGetDate(Date getDate) {
		this.getDate = getDate;
	}

}
