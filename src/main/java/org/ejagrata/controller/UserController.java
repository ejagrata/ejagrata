package org.ejagrata.controller;

import java.util.Map;

import org.ejagrata.beans.UserBean;
import org.ejagrata.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping("/user/whoami")
	public UserBean getUserByLogin(OAuth2Authentication auth) {
		if (auth != null) {
			String login = (String)((Map)auth.getUserAuthentication().getDetails()).get("username");
			return userService.getUserByLogin(login);
		} else {
			throw new RuntimeException("Not logged in");
		}
	}

}