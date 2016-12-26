package org.ejagrata.service;

import org.ejagrata.beans.UserBean;


public interface UserService {

	Iterable<UserBean> listUsers();
	UserBean getUser(Integer id);
	UserBean getUserByLogin(String login);
}
