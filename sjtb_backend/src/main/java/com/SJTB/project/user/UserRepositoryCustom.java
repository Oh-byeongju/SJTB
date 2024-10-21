package com.SJTB.project.user;

import java.util.List;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

public interface UserRepositoryCustom {
    List<UserEntity> findAllUsersQueryDSL();
}

@Repository
@RequiredArgsConstructor
class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QUserEntity qUserEntity = QUserEntity.userEntity;

    public List<UserEntity> findAllUsersQueryDSL() {
        return queryFactory
                .select(Projections.fields(UserEntity.class,
                        qUserEntity.userId,
                        qUserEntity.userEmail))
                .from(qUserEntity)
                .fetch();
    }
}