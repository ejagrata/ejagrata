package org.ejagrata.controller;

import java.util.List;

import org.ejagrata.beans.SchoolBean;
import org.ejagrata.entity.School;
import org.ejagrata.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @RequestMapping(method = RequestMethod.POST, value = "/school/save")
    public void saveSchool(SchoolBean schoolBean) throws Exception {
    	schoolService.saveSchool(schoolBean);
    	//return  "{success: 'success'}";
    }

    @RequestMapping("/school/{schoolId}")
    public SchoolBean getSchool(@PathVariable("schoolId") Integer schoolId  ) {
        return schoolService.getSchool(schoolId);
    }
    
    @RequestMapping("/school/district/{districtId}")
    public List<SchoolBean> getSchoolByDistrict(@PathVariable("districtId") Integer districtId ) {
        return schoolService.getSchoolByDistrict(districtId);
    }
    
    @RequestMapping("/school/district/{districtId}/{edDistrictId}")
    public List<SchoolBean> getSchoolByEdDistrict(@PathVariable("districtId") Integer districtId, @PathVariable("edDistrictId") Integer edDistrictId ) {
        return schoolService.getSchoolByEdDistrict(districtId, edDistrictId);
    }
    
    @RequestMapping("/school/listAll")
    public Iterable<School> getAllSchool() {
        return schoolService.getAllSchool();
    }
    
    @RequestMapping("/school/district/{districtId}/{edDistrictId}/{schoolType}")
    public List<SchoolBean> getSchoolByType(@PathVariable("districtId") Integer districtId , @PathVariable("edDistrictId") Integer edDistrictId 
    		,@PathVariable("schoolType") String schoolType) {
        return schoolService.getSchoolByType(districtId, edDistrictId, schoolType);
    }
    
}
