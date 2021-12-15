package com.bsuir.mercury.repository;

import com.bsuir.mercury.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findUserByLogin(@Param("login") String login);
    User findUserById(@Param("id") Long id);
    User findUserByEmail(@Param("email") String email);
}
