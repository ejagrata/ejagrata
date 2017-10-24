package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.School;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SchoolRepository extends CrudRepository<School, Integer> {

    List<School> findByDistrictId(Integer districtId);
    
    List<School> findByDistrictIdAndEducationalDistrictId(Integer districtId , Integer educationalDistrictId);
    
    List<School> findByDistrictIdAndEducationalDistrictIdAndSchoolType(Integer districtId , Integer educationalDistrictId, String schoolType);

    @Query("select s from School s, PhaseSchools ps where s.id = ps.id.schoolId and s.districtId = ?1 and s.educationalDistrictId = ?2 and s.schoolType = ?3 and ps.id.phase = ?4 ")
    List<School> getSchoolsByPhase(Integer districtId , Integer educationalDistrictId, String schoolType, String phase);
}
