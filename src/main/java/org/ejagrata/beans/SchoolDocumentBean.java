package org.ejagrata.beans;

import org.springframework.web.multipart.MultipartFile;

public class SchoolDocumentBean {

    private Integer docId;

    private String docPath;

    private Integer schoolId;
    
    private MultipartFile schoolDocs;

    public Integer getDocId() {
        return docId;
    }

    public void setDocId(Integer docId) {
        this.docId = docId;
    }

    public String getDocPath() {
        return docPath;
    }

    public void setDocPath(String docPath) {
        this.docPath = docPath;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public MultipartFile getSchoolDocs() {
        return schoolDocs;
    }

    public void setSchoolDocs(MultipartFile schoolDocs) {
        this.schoolDocs = schoolDocs;
    }

}
