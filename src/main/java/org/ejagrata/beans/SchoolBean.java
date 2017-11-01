package org.ejagrata.beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private Boolean enabled;
    private Integer districtId;
    private Integer educationalDistrictId;
    private String districtName;
    private String educationalDistrictName;
    private List<SchoolDocumentBean> schoolDocumentBean;
    private List<Integer> deleteList;
    private List<Integer> phases = new ArrayList<>();
    private List<PhaseSchoolsBean> phasesDetails = new ArrayList<>();
    
    public List<PhaseSchoolsBean> getPhasesDetails() {
		return phasesDetails;
	}

	public void addPhasesDetails(PhaseSchoolsBean phasesDetails) {
		this.phasesDetails.add(phasesDetails);
	}

	public void setPhases(List<Integer> phases) {
		this.phases = phases;
	}

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

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public Integer getEducationalDistrictId() {
		return educationalDistrictId;
	}

	public void setEducationalDistrictId(Integer educationalDistrictId) {
		this.educationalDistrictId = educationalDistrictId;
	}

	public String getEducationalDistrictName() {
		return educationalDistrictName;
	}

	public void setEducationalDistrictName(String educationalDistrictName) {
		this.educationalDistrictName = educationalDistrictName;
	}

	public List<Integer> getDeleteList() {
		return deleteList;
	}

	public void setDeleteList(List<Integer> deleteList) {
		this.deleteList = deleteList;
	}

	public List<Integer> getPhases() {
		return phases;
	}

	public void addPhase(Integer phase) {
		this.phases.add(phase);
	}
}
