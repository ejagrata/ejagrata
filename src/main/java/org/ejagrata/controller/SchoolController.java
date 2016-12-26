package org.ejagrata.controller;

import org.ejagrata.beans.SchoolBean;
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

	@RequestMapping(method = RequestMethod.POST, value = "/school")
	public SchoolBean saveSchool(@RequestBody SchoolBean hospital) {
		return null;
	}

	@RequestMapping("/school/{schoolId}")
	public SchoolBean getSchool(@PathVariable("schoolId") Integer schoolId	) {
		return schoolService.getSchool(schoolId);
	}
}
