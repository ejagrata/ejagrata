package org.ejagrata.beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PhaseSchoolsBean {

	private Date sessionDate;
    private String sessionStatus;
    private String comments;
    private String phase;
    private Integer schoolId;
    private List<SchoolDocumentBean> schoolDocumentBean = new ArrayList<>();
    
    public void addSchoolDocumentBean(SchoolDocumentBean bean) {
    	schoolDocumentBean.add(bean);
    }
    
    public List<SchoolDocumentBean> getSchoolDocumentBean() {
		return schoolDocumentBean;
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
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	public Integer getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(Integer schoolId) {
		this.schoolId = schoolId;
	}
}
