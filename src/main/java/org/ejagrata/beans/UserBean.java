package org.ejagrata.beans;

import java.util.HashSet;
import java.util.Set;

import org.ejagrata.entity.Role;

public class UserBean {

	private Integer id;

	private String name;

	private String login;

	private Set<Role> roles = new HashSet<Role>();
	
	private Boolean enabled;
	
	private String email;
	
	private String phone;
	
	private Boolean firstLog;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

    public Boolean getFirstLog() {
        return firstLog;
    }

    public void setFirstLog(Boolean firstLog) {
        this.firstLog = firstLog;
    }

}