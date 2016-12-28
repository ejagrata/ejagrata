package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.SchoolDocument;
import org.springframework.data.repository.CrudRepository;

public interface SchoolDocumentRepository extends CrudRepository<SchoolDocument, Integer> {

    List<SchoolDocument> findBySchoolId(Integer schoolId);
}
