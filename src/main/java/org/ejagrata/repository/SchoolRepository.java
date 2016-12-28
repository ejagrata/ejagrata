package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.School;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SchoolRepository extends CrudRepository<School, Integer> {

    List<School> findByDistrictId(Integer districtId);
    
    @Query("select u from school u where u.districtId = ?1 and u.edDistrictId = ?2" )
    List<School> searchByEdDistrictId(Integer districtId , Integer id);

    
}
