package org.ejagrata.beans;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;

public class SchoolBean {

    private Integer id;
    private String schoolCode;
    private String name;
    private String address;
    private String phone;
    private String schoolType;
    private String teacherName;
    private String teacherPhone;
    private String studentRepName;
    private Date sessionDate;
    private String sessionStatus;
    private String comments;
    private Boolean enabled;
    private Integer districtId;
    private Integer edDistrictId;
    private String districtName;
    private String edDistrictName;
    private List<SchoolDocumentBean> schoolDocumentBean;

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

    public List<SchoolDocumentBean> getSchoolDocumentBean() {
        return schoolDocumentBean;
    }

    public void setSchoolDocumentBean(List<SchoolDocumentBean> schoolDocumentBean) {
        this.schoolDocumentBean = schoolDocumentBean;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Integer getEdDistrictId() {
        return edDistrictId;
    }

    public void setEdDistrictId(Integer edDistrictId) {
        this.edDistrictId = edDistrictId;
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

	public String getEdDistrictName() {
		return edDistrictName;
	}

	public void setEdDistrictName(String edDistrictName) {
		this.edDistrictName = edDistrictName;
	}

}
