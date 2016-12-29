package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.School;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SchoolRepository extends CrudRepository<School, Integer> {

    List<School> findByDistrictId(Integer districtId);
    
    List<School> findByDistrictIdAndEdDistrictId(Integer districtId , Integer id);
    
    List<School> findByDistrictIdAndEdDistrictIdAndSchoolType(Integer districtId , Integer id, String schoolType);

    
}
