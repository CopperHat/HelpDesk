package com.helpdesk.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Size(min = 3, message = "FirstName must have a minimum of 3 characters")
	@Column(name = "first_name", nullable = false, length = 70)
	private String firtsName;

	@Size(min = 3, message = "Lastname must have a minimum of 3 characters")
	@Column(name = "last_name", nullable = false, length = 70)
	private String lastName;

	@Email(message = "Email should be valid")
	@Column(name = "email", nullable = false, length = 30)
	private String email;

	@Size(min = 8, message = "Password must have a minimum of 8 characters")
	@Column(name = "password", nullable = false, length = 70)
	private String password;

	@Size(min = 9, max = 9, message = "Phone must have 9 characters")
	@Column(name = "phone", nullable = false, length = 9)
	private String phone;

	@ManyToOne
	@JoinColumn(name = "userType_id", nullable = false)
	private UserType userTypeId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirtsName() {
		return firtsName;
	}

	public void setFirtsName(String firtsName) {
		this.firtsName = firtsName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public UserType getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(UserType userTypeId) {
		this.userTypeId = userTypeId;
	}

}
