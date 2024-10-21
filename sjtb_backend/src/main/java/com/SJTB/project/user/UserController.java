package com.SJTB.project.user;

import com.SJTB.framework.data.ResultVo;
import com.SJTB.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/User")
public class UserController extends BaseController {

    private final UserService userService;

    @GetMapping("/getAllUserList")
    public ResponseEntity<ResultVo<List<UserResponseDto>>> getAllUserList() {
        return ResponseEntity.ok().body(userService.getAllUserList());
    }

    @PostMapping("/Join")
    public ResponseEntity<ResultVo<UserResponseDto>> UserJoin(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok().body(userService.UserJoin(userRequestDto));
    }
}
