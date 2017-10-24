package org.ejagrata.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="phase_schools")
public class PhaseSchools implements Serializable{
 	
	@Id
    private PhaseSchoolsId id;

	public PhaseSchoolsId getId() {
		return id;
	}

	public void setId(PhaseSchoolsId id) {
		this.id = id;
	}
}
