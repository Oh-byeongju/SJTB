package com.SJTB.project.user;

import com.SJTB.project.base.BaseEntity;
import com.SJTB.project.boad.BoadEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
// 현재 QueryDSL을 사용할 떄 Entity를 반환하려면 접근 제어자 PROTECTED를 사용 못해서 주석처리 해둠
// 내부적으로 이야기 해보고 Dto를 반환해도 될꺼 같으면 다시 PROTECTED로 변경
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "sy_usr_info")
public class UserEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sy_usr_info_pk")
    @SequenceGenerator(name = "seq_sy_usr_info_pk", sequenceName = "seq_sy_usr_info_pk", allocationSize = 1)
    @Column(name = "userid")
    private Integer userId;

    @Column(name = "useremail", unique=true, length = 100)
    private String userEmail;

    @Column(name = "passwd", length = 250)
    private String passWd;

    @Column(name = "username", length = 10)
    private String userName;

    @Column(name = "profilecont", length = 500)
    private String profileCont;

    @Column(name = "profilepic", length = 250)
    private String profilePic;

    @Column(name = "useyn", length = 1)
    private String useYN;

    @Column(name = "logintoken", length = 500)
    private String loginToken;

    @Column(name = "lastlogindt")
    private LocalDateTime lastLoginDt;

    @Column(name = "userauth", length = 50)
    private String userAuth;

    // 필요 시 사용
    @OneToMany(fetch = FetchType.LAZY,
            mappedBy = "user",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true)
    private List<BoadEntity> boads;

    @Builder
    public UserEntity(Integer userId, String userEmail, String passWd, String userName, String profileCont,
                      String profilePic, String useYN, String loginToken, LocalDateTime lastLoginDt, String userAuth,List<BoadEntity> boads,
                      String firsRegId, String firsRegIp, LocalDateTime firsRegDt, String finaRegId, String finaRegIp, LocalDateTime finaRegDt) {
        super(firsRegId, firsRegIp, firsRegDt, finaRegId, finaRegIp, finaRegDt);
        this.userId = userId;
        this.userEmail = userEmail;
        this.passWd = passWd;
        this.userName = userName;
        this.profileCont = profileCont;
        this.profilePic = profilePic;
        this.useYN = useYN;
        this.loginToken = loginToken;
        this.lastLoginDt = lastLoginDt;
        this.userAuth = userAuth;
        this.boads = boads;
    }
}
