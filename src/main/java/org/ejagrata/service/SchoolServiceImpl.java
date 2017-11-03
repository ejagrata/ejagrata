package org.ejagrata.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.ejagrata.beans.PhaseSchoolsBean;
import org.ejagrata.beans.SchoolBean;
import org.ejagrata.beans.SchoolDocumentBean;
import org.ejagrata.entity.PhaseSchools;
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
		List<Object[]> schoolAndPhase = schoolRepository.getSchool(id);
		if (schoolAndPhase != null && !schoolAndPhase.isEmpty() ) {
			List<SchoolBean> schoolBeanList = schoolEntityToBean(schoolAndPhase);
			return schoolBeanList.get(0);
		}
		return null;
	}

	@Transactional
	@Override
	public String saveSchool(SchoolBean schoolBean) throws Exception {
		School school = new School();
		BeanUtils.copyProperties(schoolBean, school);
		schoolRepository.save(school);
		/*if (schoolBean.getSchoolDocumentBean() != null && !schoolBean.getSchoolDocumentBean().isEmpty()) {
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

		}*/
		if (schoolBean.getDeleteList() != null) {
			for (Integer docId : schoolBean.getDeleteList()) {
				schoolDocRepo.delete(docId);
			}
		}
		return "success";
	}

	@Override
	public List<SchoolBean> getSchoolByDistrict(Integer districtId) {
		List<Object[]> schoolList = schoolRepository.getByDistrictId(districtId);
		List<SchoolBean> schoolBeanList = schoolEntityToBean(schoolList);
		return schoolBeanList;
	}

	@Override
	public List<SchoolBean> getSchoolByEdDistrict(Integer districtId, Integer edDistrictId) {
		List<Object[]> schoolList = schoolRepository.getByDistrictIdAndEducationalDistrictId(districtId, edDistrictId);
		
		List<SchoolBean> schoolBeanList = schoolEntityToBean(schoolList);
		
		return schoolBeanList;
	}

	@Override
	public Iterable<School> getAllSchool() {
		Iterable<School> test = schoolRepository.findAll();
		/*for (School s : test) {
			if (s.getSessionDate() != null) {
				Date date = setHours(s.getSessionDate());
                s.setSessionDate(date);
			}
		}*/
		return test;
	}

	@Override
	public List<SchoolBean> getSchoolByType(Integer districtId, Integer edDistrictId, String schoolType) {

		/*List<School> schoolList = schoolRepository.findByDistrictIdAndEducationalDistrictIdAndSchoolType(districtId,
				edDistrictId, schoolType);*/
		List<Object[]> schoolList = schoolRepository.getSchoolsByPhase(districtId,
				edDistrictId, schoolType);
		
		List<SchoolBean> schoolBeanList = schoolEntityToBean(schoolList);
		return schoolBeanList;
	}

	private List<SchoolBean> schoolEntityToBean(List<Object[]> schoolList) {
		List<SchoolBean> schoolBeanList = new ArrayList<>();
		Map<Integer, SchoolBean> mapOfSchools = new HashMap<>();
		for (Object[] schoolAndPhase : schoolList) {
			School school = (School)schoolAndPhase[0];
			PhaseSchools phase = (PhaseSchools)schoolAndPhase[1];
			
			SchoolBean schoolBean = mapOfSchools.get(school.getId());
			if (schoolBean == null) {
				schoolBean = new SchoolBean();
				BeanUtils.copyProperties(school, schoolBean);
				
				mapOfSchools.put(school.getId(), schoolBean);
				schoolBeanList.add(schoolBean);
			}

			schoolBean.addPhase(Integer.parseInt(phase.getId().getPhase()));
			PhaseSchoolsBean psb = new PhaseSchoolsBean();
			psb.setSchoolId(phase.getId().getSchoolId());
			psb.setPhase(phase.getId().getPhase());
			psb.setSessionDate(phase.getSessionDate());
			psb.setSessionStatus(phase.getSessionStatus());
			psb.setComments(phase.getComments());
			schoolBean.addPhasesDetails(psb);
		}
		
		for (SchoolBean school : schoolBeanList) {
			List<SchoolDocument> schoolDocumentList = schoolDocRepo.findBySchoolId(school.getId());
			addSchoolDoc(school, schoolDocumentList);
		}
		
		return schoolBeanList;
	}

	private void addSchoolDoc(SchoolBean school, List<SchoolDocument> schoolDocumentList) {
		for (SchoolDocument schoolDocument : schoolDocumentList) {
			SchoolDocumentBean schoolDocumentBean = new SchoolDocumentBean();
			BeanUtils.copyProperties(schoolDocument, schoolDocumentBean);
			
			for (PhaseSchoolsBean psb : school.getPhasesDetails()) {
				if (psb.getPhase().equals(schoolDocument.getPhase())) {
					psb.addSchoolDocumentBean(schoolDocumentBean);
					break;
				}
			}
		}
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
