package org.ejagrata.repository;

import java.util.List;

import org.ejagrata.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findByLogin(String login);

    @Query("Select u from User u join u.roles r where r.name = ?1 ")
    public List<User> findByUserRole(String role); 
	}

