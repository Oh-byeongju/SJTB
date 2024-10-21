package com.SJTB.project.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

// 특정 열만 Select 할떄 필요한 매핑(JPQL에서 사용)
interface UserInfoMapping {
    Integer getUserId();
    String getUserEmail();
    String getUserAuth();
}

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>, UserRepositoryCustom{
    @Query("SELECT u.userId, u.userEmail, u.userAuth " +
            "FROM UserEntity u")
    List<UserInfoMapping> findAllByJPQL();

    UserEntity findByUserEmail(String email);
}