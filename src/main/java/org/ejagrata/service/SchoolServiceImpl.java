package org.ejagrata.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.ejagrata.beans.DistrictBean;
import org.ejagrata.beans.SchoolBean;
import org.ejagrata.beans.SchoolDocumentBean;
import org.ejagrata.entity.District;
import org.ejagrata.entity.School;
import org.ejagrata.entity.SchoolDocument;
import org.ejagrata.repository.SchoolDocumentRepository;
import org.ejagrata.repository.SchoolRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
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
		return bean;
	}

    @Override
    public SchoolBean saveSchool(SchoolBean schoolBean) throws Exception {
        School school = new School();
        BeanUtils.copyProperties(schoolBean, school);
        schoolRepository.save(school);
        List<SchoolDocumentBean> schoolDocBeanList= schoolBean.getSchoolDocumentBean();
        new File(fileSavePath + school.getId() ).mkdirs();
        for(SchoolDocumentBean schoolDocBean : schoolDocBeanList){
            if(schoolDocBean.getSchoolDocs() != null){
                SchoolDocument schoolDoc = new  SchoolDocument();
                BeanUtils.copyProperties(schoolDocBean, schoolDoc);
                schoolDoc.setSchoolId(school.getId());
                schoolDocRepo.save(schoolDoc);
                String orginalFileName = schoolDocBean.getSchoolDocs().getOriginalFilename();
                String docPath = "/" + school.getId() + "/" + schoolDoc.getDocId() + "_" + orginalFileName;
                schoolDoc.setDocPath(docPath);
                File file = new File(fileSavePath + docPath);
                schoolDocBean.getSchoolDocs().transferTo(file);
                schoolDocRepo.save(schoolDoc);               
            }
        }
        return schoolBean;
    }

    @Override
    public List<SchoolBean> getSchoolByDistrict(Integer districtId) {
        List<School> schoolList = schoolRepository.findByDistrictId(districtId);
        List<SchoolBean> schoolBeanList = new ArrayList<>();
        for( School school : schoolList){
            SchoolBean schoolBean =new SchoolBean();
            BeanUtils.copyProperties(school, schoolBean);
            schoolBeanList.add(schoolBean);
        }
        return schoolBeanList;
    }

    @Override
    public List<SchoolBean> getSchoolByEdDistrict(Integer districtId, Integer edDistrictId) {
        List<School> schoolList = schoolRepository.findByDistrictIdAndEdDistrictId(districtId, edDistrictId);
        List<SchoolBean> schoolBeanList = new ArrayList<>();
        for( School school : schoolList){
            SchoolBean schoolBean =new SchoolBean();
            BeanUtils.copyProperties(school, schoolBean);
            schoolBeanList.add(schoolBean);
        }
        return schoolBeanList;
    }

}
