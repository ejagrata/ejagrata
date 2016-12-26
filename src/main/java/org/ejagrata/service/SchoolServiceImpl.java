package org.ejagrata.service;

import org.ejagrata.beans.DistrictBean;
import org.ejagrata.beans.SchoolBean;
import org.ejagrata.entity.District;
import org.ejagrata.entity.School;
import org.ejagrata.repository.SchoolRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	private SchoolRepository schoolRepository;
	
	@Override
	public SchoolBean getSchool(Integer id) {
		School entity = schoolRepository.findOne(id);
		SchoolBean bean = new SchoolBean();
		BeanUtils.copyProperties(entity, bean);
		
		District districtEntity = entity.getDistrict();
		DistrictBean districtBean = new DistrictBean();
		BeanUtils.copyProperties(districtEntity, districtBean);
		bean.setDistrict(districtBean);
		
		return bean;
	}

}
