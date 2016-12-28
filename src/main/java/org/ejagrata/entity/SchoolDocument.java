package org.ejagrata.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="school_document")
public class SchoolDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="doc_id")
    private Integer docId;
    
    @Column(name="doc_path")
    private String docPath;
    
    @Column(name="school_id")
    private Integer schoolId;

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
    
    
    
}
