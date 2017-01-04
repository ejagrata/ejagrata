package org.ejagrata.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="school")
public class School {
 	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name="school_code")
	private String schoolCode;
	
	@Column(name="name")
	private String name;
	
	@Column(name="address")
	private String address;
	
	@Column(name="phone")
	private String phone;

	@Column(name="school_type")
	private String schoolType;
	
	@Column(name="teacher_name")
	private String teacherName;
	
	@Column(name="teacher_phone")
	private String teacherPhone;
	
	@Column(name="student_rep_name")
	private String studentRepName;
	
	@Column(name="session_date")
	private Date sessionDate;
	
	@Column(name="session_status")
	private String sessionStatus;
	
	private String comments;
	
	@Column(name="enabled")
	private Boolean enabled;
	
	@Column(name="district_id")
	private Integer districtId;
	
	@Column(name="district_name")
	private String districtName;
	
	@Column(name="educational_district_id")
	private Integer educationalDistrictId;
	
	@Column(name="educational_district_name")
	private String educationalDistrictName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSchoolCode() {
		return schoolCode;
	}

	public void setSchoolCode(String schoolCode) {
		this.schoolCode = schoolCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getSchoolType() {
		return schoolType;
	}

	public void setSchoolType(String schoolType) {
		this.schoolType = schoolType;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getTeacherPhone() {
		return teacherPhone;
	}

	public void setTeacherPhone(String teacherPhone) {
		this.teacherPhone = teacherPhone;
	}

	public String getStudentRepName() {
		return studentRepName;
	}

	public void setStudentRepName(String studentRepName) {
		this.studentRepName = studentRepName;
	}

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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Integer getEducationalDistrictId() {
        return educationalDistrictId;
    }

    public void setEducationalDistrictId(Integer educationalDistrictId) {
        this.educationalDistrictId = educationalDistrictId;
    }

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public String getEducationalDistrictName() {
		return educationalDistrictName;
	}

	public void setEducationalDistrictName(String educationalDistrictName) {
		this.educationalDistrictName = educationalDistrictName;
	}

}
