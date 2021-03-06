package com.softsystem.backend.repository;

import com.softsystem.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN u.roles ur WHERE ur.id = 2")
    List<User> findAllUsers();

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

    User getUserByUsername(String username);

    @Query("SELECT r.name FROM User u JOIN u.roles r WHERE u.id = :userId AND NOT r.name='USER'")
    String getRoleByUser(@Param("userId")Long userId);

    @Query("SELECT u FROM User u WHERE u.id = :userId")
    User findUserById(@Param("userId")Long userId);

}
