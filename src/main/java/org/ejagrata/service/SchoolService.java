package org.ejagrata.service;

import java.util.List;

import org.ejagrata.beans.SchoolBean;
import org.ejagrata.entity.School;

public interface SchoolService {

	public SchoolBean getSchool(Integer id);
	
	public String saveSchool(SchoolBean schoolBean) throws Exception;
	
	public List<SchoolBean> getSchoolByDistrict(Integer districtId);
	
    public List<SchoolBean> getSchoolByEdDistrict(Integer districtId, Integer edDistrictId);

	public Iterable<School> getAllSchool();

	List<SchoolBean> getSchoolByType(Integer districtId, Integer edDistrictId, String schoolType);
}
