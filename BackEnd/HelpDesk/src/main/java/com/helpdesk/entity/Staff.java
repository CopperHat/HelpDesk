package com.helpdesk.entity;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "staff")
public class Staff {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Size(min = 3, message = "FirstName must have a minimum of 3 characters")
	@Column(name = "first_name", nullable = false, length = 70)
	private String firtsName;

	@Size(min = 3, message = "LastName must have a minimum of 3 characters")
	@Column(name = "last_name", nullable = false, length = 70)
	private String lastName;

	@Size(min = 9, max = 9, message = "Phone must have 9 characters")
	@Column(name = "phone", nullable = false, length = 9)
	private String phone;

	@Email(message = "Email should be valid")
	@Column(name = "email", nullable = false, length = 30)
	private String email;

	@Size(min = 8, message = "Password must have a minimum of 8 characters")
	@Column(name = "password", nullable = false, length = 30)
	private String password;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date joinDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date leftDate;

	private ArrayList<Ticket> maxTicket = new ArrayList<Ticket>(3);
	
	/**@PrePersist
	public void createFecha() {
		joinDate= new Date();
	}**/

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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
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

	public Date getJoinedDate() {
		return joinDate;
	}

	public void setJoinedDate(Date joinedDate) {
		this.joinDate = joinedDate;
	}

	public Date getLefDate() {
		return leftDate;
	}

	public void setLefDate(Date lefDate) {
		this.leftDate = lefDate;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public Date getLeftDate() {
		return leftDate;
	}

	public void setLeftDate(Date leftDate) {
		this.leftDate = leftDate;
	}

	public ArrayList<Ticket> getMaxTicket() {
		return maxTicket;
	}

	public void setMaxTicket(ArrayList<Ticket> maxTicket) {
		this.maxTicket = maxTicket;
	}

}
