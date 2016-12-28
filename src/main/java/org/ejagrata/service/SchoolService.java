package org.ejagrata.service;

import java.util.List;

import org.ejagrata.beans.SchoolBean;

public interface SchoolService {

	public SchoolBean getSchool(Integer id);
	
	public SchoolBean saveSchool(SchoolBean schoolBean) throws Exception;
	
	public List<SchoolBean> getSchoolByDistrict(Integer districtId);
	
    public List<SchoolBean> getSchoolByEdDistrict(Integer districtId, Integer edDistrictId);
}
