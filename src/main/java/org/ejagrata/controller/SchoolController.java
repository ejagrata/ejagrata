package org.ejagrata.controller;

import org.ejagrata.beans.SchoolBean;
import org.ejagrata.entity.School;
import org.ejagrata.repository.SchoolRepository;
import org.ejagrata.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SchoolController {

	@Autowired
	private SchoolService schoolService;
	
	@Autowired
	private SchoolRepository schoolRepository;

	@RequestMapping(method=RequestMethod.GET,value="/school/{schoolId}")
	public School getSchool(@PathVariable("schoolId") Integer schoolId	) {
		return schoolRepository.findOne(schoolId);
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/school")
	public Iterable<School> getSchool() {
		return schoolRepository.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/school")
	public School saveSchool(@RequestBody School school) {
		return schoolRepository.save(school);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/school")
	public School updateSchool(@RequestBody School school) {
		return schoolRepository.save(school);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/school/{schoolId}")
	public void deleteSchool(@PathVariable("schoolId") Integer schoolId	) {
		 schoolRepository.delete(schoolId);
	}
	
	
}
