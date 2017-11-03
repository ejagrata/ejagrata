package org.ejagrata.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="phase_schools")
public class PhaseSchools implements Serializable{
 	
	@Id
    private PhaseSchoolsId id;
	
	@Column(name="session_date")
	private Date sessionDate;
	
	@Column(name="session_status")
	private String sessionStatus;
	
	private String comments;
	
	public Date getSessionDate() {
		return sessionDate;
	}

	public void setSessionDate(Date sessionDate) {
		this.sessionDate = sessionDate;
	}

	public String getSessionStatus() {
		return sessionStatus;
	}

	public void setSessionStatus(String sessionStatus) {
		this.sessionStatus = sessionStatus;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public PhaseSchoolsId getId() {
		return id;
	}

	public void setId(PhaseSchoolsId id) {
		this.id = id;
	}
}
