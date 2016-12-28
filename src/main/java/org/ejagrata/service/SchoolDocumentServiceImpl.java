package org.ejagrata.service;

import java.util.List;

import org.ejagrata.beans.SchoolDocumentBean;
import org.ejagrata.entity.SchoolDocument;
import org.ejagrata.repository.SchoolDocumentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SchoolDocumentServiceImpl implements SchoolDocumentService {

    @Autowired
    SchoolDocumentRepository schoolDocRepo;
    
    @Override
    public SchoolDocument saveSchoolDocumnet(SchoolDocumentBean schoolDocumentBean) {
        
        SchoolDocument schoolDoc=new SchoolDocument();
        BeanUtils.copyProperties(schoolDocumentBean, schoolDoc);
        return schoolDocRepo.save(schoolDoc);
    }

    @Override
    public List<SchoolDocument> getSchoolDocumentList(Integer schoolId) {
        
        return schoolDocRepo.findBySchoolId(schoolId);
    }

    @Override
    public SchoolDocument getSchoolDocument(Integer docId) {
        
        return schoolDocRepo.findOne(docId);
    }

}
