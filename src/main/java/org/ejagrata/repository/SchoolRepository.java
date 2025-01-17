package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.School;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SchoolRepository extends CrudRepository<School, Integer> {

	@Query("select s, ps from School s, PhaseSchools ps where s.id = ps.id.schoolId and s.id= ?1 ")
	List<Object[]> getSchool(Integer id);
	
	@Query("select s, ps from School s, PhaseSchools ps where s.id = ps.id.schoolId and s.districtId = ?1 ")
    List<Object[]> getByDistrictId(Integer districtId);
    
    @Query("select s, ps from School s, PhaseSchools ps where s.id = ps.id.schoolId and s.districtId = ?1 " +
    	    " and s.educationalDistrictId = ?2 ")
    List<Object[]> getByDistrictIdAndEducationalDistrictId(Integer districtId , Integer educationalDistrictId);

    @Query("select s, ps from School s, PhaseSchools ps where s.id = ps.id.schoolId and s.districtId = ?1 " +
    " and s.educationalDistrictId = ?2 and s.schoolType = ?3 ")
    List<Object[]> getSchoolsByPhase(Integer districtId , Integer educationalDistrictId, String schoolType);
}
