package org.ejagrata.service;

import java.util.ArrayList;
import java.util.List;

import org.ejagrata.beans.UserBean;
import org.ejagrata.entity.User;
import org.ejagrata.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public UserBean getUser(Integer id) {
        User user = userRepo.findOne(id);
        UserBean userBean = new UserBean();
        BeanUtils.copyProperties(user, userBean);
        return userBean;
    }

    public Iterable<UserBean> listUsers() {

        Iterable<User> list = userRepo.findAll();
        List<UserBean> userBeans = new ArrayList<>();

        for (User usr : list) {
            UserBean userBean = new UserBean();
            BeanUtils.copyProperties(usr, userBean);
            userBeans.add(userBean);
        }

        return userBeans;
    }

    @Override
    public UserBean getUserByLogin(String login) {
        User user = userRepo.findByLogin(login);
        UserBean userBean = new UserBean();
        BeanUtils.copyProperties(user, userBean);
        return userBean;
    }

    public void setUserRepo(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

}
