package org.ejagrata.service;

import java.util.List;

import org.ejagrata.beans.SchoolDocumentBean;
import org.ejagrata.entity.SchoolDocument;

public interface SchoolDocumentService {

    SchoolDocument saveSchoolDocumnet(SchoolDocumentBean schoolDocumentBean);
    
    List<SchoolDocument> getSchoolDocumentList(Integer schoolId);
    
    SchoolDocument getSchoolDocument(Integer docId);
}
