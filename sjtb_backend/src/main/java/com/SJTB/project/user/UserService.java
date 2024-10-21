package com.SJTB.project.user;

import com.SJTB.framework.data.ResultVo;
import com.SJTB.project.base.BaseService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService extends BaseService {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    // Select 에는 Transactional 안적어도됨
    public ResultVo<List<UserResponseDto>> getAllUserList() {
        ResultVo<List<UserResponseDto>> resultVO = new ResultVo<>();

        List<UserEntity> defaultJPA = userRepository.findAll();

        List<UserInfoMapping> jpqlJPA = userRepository.findAllByJPQL();

        List<UserEntity> QueryDSL = userRepository.findAllUsersQueryDSL();

        // 프론트로 던져줄 데이터 DTO로 가공
        List<UserResponseDto> userList = defaultJPA.stream()
                .map(data -> UserResponseDto.builder()
                        .userId(data.getUserId())
                        .userEmail(data.getUserEmail())
                        .build())
                .collect(Collectors.toList());

        resultVO.setContent(userList);

        return resultVO;
    }

    @Transactional
    public ResultVo<UserResponseDto> UserJoin(UserRequestDto userRequestDto) {
        ResultVo<UserResponseDto> resultVO = new ResultVo<>(UserResponseDto.class);

        try {
            // UserEntity 객체 생성
            UserEntity userEntity = UserEntity.builder()
                    .userEmail(userRequestDto.getUserEmail())
                    .passWd(userRequestDto.getUserPw())
                    .userName(userRequestDto.getUserName())
                    .useYN("Y")
                    .userAuth("가입 전")
                    .build();

            // 사용자 저장
            userRepository.save(userEntity);

            // 성공적인 결과 설정
            UserResponseDto userResponseDto = UserResponseDto.builder()
                    .userId(userEntity.getUserId())
                    .userEmail(userEntity.getUserEmail())
                    .build();

            resultVO.setContent(userResponseDto);
        } catch (DataIntegrityViolationException e) {
            // 데이터 무결성 위반 (예: 유니크 제약 조건 위반) 처리
            logger.error("Data integrity violation: " + e.getMessage(), e);
            resultVO.setIsError(true);
            resultVO.setErrorMsg("Data integrity violation: " + e.getMessage());
        } catch (EntityExistsException e) {
            // 엔티티가 이미 존재하는 경우 처리
            logger.error("Entity already exists: " + e.getMessage(), e);
            resultVO.setIsError(true);
            resultVO.setErrorMsg("Entity already exists: " + e.getMessage());
        } catch (Exception e) {
            // 일반적인 예외 처리
            logger.error("User join failed: " + e.getMessage(), e);
            resultVO.setIsError(true);
            resultVO.setErrorMsg("User join failed: " + e.getMessage());
        }

        //@Transactional을 적는곳 -> select만 하면 없어도 됨
        //@Transactional을 적으면 예외처리가 제대로 안되는 경향이 있음
        //@Transactional은 어디까지 포함되어야 하나 고민해보기

        return resultVO;
    }
}
