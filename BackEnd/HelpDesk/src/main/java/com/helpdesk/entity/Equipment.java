package com.helpdesk.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "equipments")
public class Equipment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date acquisitionDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date retirementDate;

	@Size(max = 50, message = "Code must be 50 characters as max")
	@Column(name = "code", nullable = false, length = 50)
	private String code;

	@Size(max = 50, message = "Name must be 50 characters as max")
	@Column(name = "name", nullable = false, length = 50)
	private String name;

	@Size(max = 20, message = "Description must be 20 characters as max")
	@Column(name = "description", nullable = false, length = 30)
	private String description;

	@Size(max = 50, message = "Name of manufacture must be 50 characters as max")
	@Column(name = "manufactureName", nullable = false, length = 50)
	private String manufactureName;

	@ManyToOne
	@JoinColumn(name = "equipType_id", nullable = false)
	private EquipType equipTypeId;

	@Size(max = 200, message = "Other detials must be 200 characters as max")
	@Column(name = "otherDetails", nullable = true, length = 200)
	private String otherDetails;
	
	public Equipment() {}

	/**@PrePersist
	public void createFecha() {
		acquisitionDate = new Date();
	}**/

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getAcquisitionDate() {
		return acquisitionDate;
	}

	public void setAcquisitionDate(Date acquisitionDate) {
		this.acquisitionDate = acquisitionDate;
	}

	public Date getRetirementDate() {
		return retirementDate;
	}

	public void setRetirementDate(Date retirementDate) {
		this.retirementDate = retirementDate;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getManufactureName() {
		return manufactureName;
	}

	public void setManufactureName(String manufactureName) {
		this.manufactureName = manufactureName;
	}

	public EquipType getEquipTypeId() {
		return equipTypeId;
	}

	public void setEquipTypeId(EquipType equipTypeId) {
		this.equipTypeId = equipTypeId;
	}

	public String getOtherDetails() {
		return otherDetails;
	}

	public void setOtherDetails(String otherDetails) {
		this.otherDetails = otherDetails;
	}

}
