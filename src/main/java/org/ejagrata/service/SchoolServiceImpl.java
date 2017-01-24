package org.ejagrata.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.ejagrata.beans.SchoolBean;
import org.ejagrata.beans.SchoolDocumentBean;
import org.ejagrata.entity.School;
import org.ejagrata.entity.SchoolDocument;
import org.ejagrata.repository.SchoolDocumentRepository;
import org.ejagrata.repository.SchoolRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("schoolService")
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	private SchoolRepository schoolRepository;

	@Autowired
	private SchoolDocumentRepository schoolDocRepo;

	@Value("${spring.files.save.path}")
	private String fileSavePath;

	@Override
	public SchoolBean getSchool(Integer id) {
		School entity = schoolRepository.findOne(id);
		SchoolBean bean = new SchoolBean();
		BeanUtils.copyProperties(entity, bean);
		List<SchoolDocument> schoolDocumentList = schoolDocRepo.findBySchoolId(id);
		List<SchoolDocumentBean> schoolDocumentBeanList = new ArrayList<>();
		for (SchoolDocument schoolDocument : schoolDocumentList) {
			SchoolDocumentBean schoolDocumentBean = new SchoolDocumentBean();
			BeanUtils.copyProperties(schoolDocument, schoolDocumentBean);
			schoolDocumentBeanList.add(schoolDocumentBean);
		}
		bean.setSchoolDocumentBean(schoolDocumentBeanList);
		return bean;
	}

	@Transactional
	@Override
	public String saveSchool(SchoolBean schoolBean) throws Exception {
		School school = new School();
		BeanUtils.copyProperties(schoolBean, school);
		schoolRepository.save(school);
		if (schoolBean.getSchoolDocumentBean() != null && !schoolBean.getSchoolDocumentBean().isEmpty()) {
			List<SchoolDocumentBean> schoolDocBeanList = schoolBean.getSchoolDocumentBean();
			new File(fileSavePath + "/" + school.getId()).mkdirs();

			for (SchoolDocumentBean schoolDocBean : schoolDocBeanList) {
				if (schoolDocBean.getSchoolDocs() != null) {
					SchoolDocument schoolDoc = new SchoolDocument();
					BeanUtils.copyProperties(schoolDocBean, schoolDoc);
					schoolDoc.setSchoolId(school.getId());
					schoolDocRepo.save(schoolDoc);
					String orginalFileName = schoolDocBean.getSchoolDocs().getOriginalFilename();
					String docPath = "/" + school.getId() + "/" + orginalFileName;
					schoolDoc.setDocPath(docPath);
					File file = new File(fileSavePath + docPath);
					schoolDocBean.getSchoolDocs().transferTo(file);
					schoolDocRepo.save(schoolDoc);
				}
			}

		}
		if (schoolBean.getDeleteList() != null) {
			for (Integer docId : schoolBean.getDeleteList()) {
				schoolDocRepo.delete(docId);
			}
		}
		return "success";
	}

	@Override
	public List<SchoolBean> getSchoolByDistrict(Integer districtId) {
		List<School> schoolList = schoolRepository.findByDistrictId(districtId);
		List<SchoolBean> schoolBeanList = new ArrayList<>();
		for (School school : schoolList) {
			SchoolBean schoolBean = new SchoolBean();
			BeanUtils.copyProperties(school, schoolBean);

			List<SchoolDocument> schoolDocumentList = schoolDocRepo.findBySchoolId(school.getId());
			List<SchoolDocumentBean> schoolDocumentBeanList = new ArrayList<>();
			for (SchoolDocument schoolDocument : schoolDocumentList) {
				SchoolDocumentBean schoolDocumentBean = new SchoolDocumentBean();
				BeanUtils.copyProperties(schoolDocument, schoolDocumentBean);
				schoolDocumentBeanList.add(schoolDocumentBean);
			}
			schoolBean.setSchoolDocumentBean(schoolDocumentBeanList);

			schoolBeanList.add(schoolBean);
		}
		return schoolBeanList;
	}

	@Override
	public List<SchoolBean> getSchoolByEdDistrict(Integer districtId, Integer edDistrictId) {
		List<School> schoolList = schoolRepository.findByDistrictIdAndEducationalDistrictId(districtId, edDistrictId);
		List<SchoolBean> schoolBeanList = new ArrayList<>();
		for (School school : schoolList) {
			SchoolBean schoolBean = new SchoolBean();
			BeanUtils.copyProperties(school, schoolBean);

			List<SchoolDocument> schoolDocumentList = schoolDocRepo.findBySchoolId(school.getId());
			List<SchoolDocumentBean> schoolDocumentBeanList = new ArrayList<>();
			for (SchoolDocument schoolDocument : schoolDocumentList) {
				SchoolDocumentBean schoolDocumentBean = new SchoolDocumentBean();
				BeanUtils.copyProperties(schoolDocument, schoolDocumentBean);
				schoolDocumentBeanList.add(schoolDocumentBean);
			}
			schoolBean.setSchoolDocumentBean(schoolDocumentBeanList);

			schoolBeanList.add(schoolBean);
		}
		return schoolBeanList;
	}

	@Override
	public Iterable<School> getAllSchool() {
		// TODO Auto-generated method stub
		Iterable<School> test = schoolRepository.findAll();
		for (School s : test) {
			if (s.getSessionDate() != null) {
				Date date = setHours(s.getSessionDate());
                s.setSessionDate(date);
			}
		}
		return test;
	}

	@Override
	public List<SchoolBean> getSchoolByType(Integer districtId, Integer edDistrictId, String schoolType) {

		List<School> schoolList = schoolRepository.findByDistrictIdAndEducationalDistrictIdAndSchoolType(districtId,
				edDistrictId, schoolType);
		List<SchoolBean> schoolBeanList = new ArrayList<>();
		for (School school : schoolList) {
			SchoolBean schoolBean = new SchoolBean();
			BeanUtils.copyProperties(school, schoolBean);

			List<SchoolDocument> schoolDocumentList = schoolDocRepo.findBySchoolId(school.getId());
			List<SchoolDocumentBean> schoolDocumentBeanList = new ArrayList<>();
			for (SchoolDocument schoolDocument : schoolDocumentList) {
				SchoolDocumentBean schoolDocumentBean = new SchoolDocumentBean();
				BeanUtils.copyProperties(schoolDocument, schoolDocumentBean);
				schoolDocumentBeanList.add(schoolDocumentBean);
			}
			schoolBean.setSchoolDocumentBean(schoolDocumentBeanList);

			schoolBeanList.add(schoolBean);
		}
		return schoolBeanList;
	}
	
	public Date setHours(Date date){
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}

}
