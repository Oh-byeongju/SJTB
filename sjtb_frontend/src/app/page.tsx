'use client'; // 이 줄을 추가하여 클라이언트 컴포넌트로 선언

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import mainStyle from '@/style/main.module.css';

interface UserInfo {
  loginToken?: string; // loginToken is optional
}

interface BodyData {
  loginToken: string;
}

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);
  var token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiIxIiwiaWF0IjoxNzI3MTc2Njk0LCJleHAiOjE3MjcxNzY3MTR9.gTXKNlI3sqLcDxegs0qwiLSl6lksjy3_gCwbVdNdJZE'

  useEffect(() => {
    console.log('userInfo 상태:', userInfo);
  }, [userInfo]);

  const handleLogin = async () => {
    const bodyData = {
      userId: "admin",
      userPw: "admin"
    };

    try {
      const response = await fetch('http://localhost:8080/public/post/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      setUserInfo(data.content); // Update userInfo state with the response data

      console.log('로그인 요청을 보냈습니다.1111');
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };

  const handleBoad = async () => {
  //   const cookies = document.cookie.split('; ');
  //   const cookieObject = {};
  //   cookies.forEach(cookie => {
  //       const [name, value] = cookie.split('=');
  //       cookieObject[name] = value;
  //   });
  //   console.log(cookieObject);

    // GET 요청 보내기
    await fetch('http://localhost:8080/Boad/getAllBoadList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      
      credentials: 'include',
    });
    // 요청 후 처리 (필요시 추가)
    console.log('요청 전달 완료');
  };

  const handleLogOut = async () => {
    const bodyData = {
      userEmail: ''
    };

    // POST 요청 보내기
    try {
      const response = await fetch('http://localhost:8080/private/post/auth/signOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(bodyData),
        credentials: 'include',
      });

      // 요청 후 처리 (필요시 추가)
      console.log('로그아웃 요청을 보냈습니다.');

      const data = await response.json();
      setUserInfo(data.content); // Update userInfo state with the response data

    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    }
  };

  const handleRenewToken = async () => {
    const bodyData: BodyData = {
      loginToken: '11'
    };

    // POST 요청 보내기
    try {
      const response = await fetch('http://localhost:8080/public/post/auth/renewToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(bodyData),
        credentials: 'include',
      });

      // 요청 후 처리 (필요시 추가)
      console.log('토큰 재발급 요청을 보냈습니다.');

      const data = await response.json();
      setUserInfo(data.content); // Update userInfo state with the response data

    } catch (error) {
      console.error('토큰 재발급 요청 실패:', error);
    }
  };
  
  return (
    <main className={mainStyle.main}>
      <h1>
        WELCOME (홈페이지의 메인이 되는 부분)
      </h1>
      <button  onClick={handleLogin} className={mainStyle.button}>로그인 테스트</button>
      <button  onClick={handleBoad} className={mainStyle.button}>auth 테스트</button>
      <button  onClick={handleLogOut} className={mainStyle.button}>로그아웃 테스트</button>
      <button  onClick={handleRenewToken} className={mainStyle.button}>토큰 재발급 테스트</button>
      <br></br>
      <br></br>
      {/* <h2>
        인기있는글(SSG -- ISR로 동기화)
      </h2>
      <div className={mainStyle.popBlogList}>
        <div className={mainStyle.popBlogPost}>
          <img src="/path/to/image1.jpg" alt="Post Image 1" className={mainStyle.postImage} />
          <h2 className={mainStyle.popPostTitle}>게시물 제목 1</h2>
          <p className={mainStyle.popPostDate}>2024년 7월 5일</p>
          <p className={mainStyle.popPostExcerpt}>여기에 게시물의 간략한 설명이 들어갑니다. 이 부분은 게시물의 요약 내용을 보여줍니다.</p>
          <a href="#" className={mainStyle.readMore}>더 읽기</a>
        </div>
        <div className={mainStyle.popBlogPost}>
          <img src="/path/to/image2.jpg" alt="Post Image 2" className={mainStyle.postImage} />
          <h2 className={mainStyle.popPostTitle}>게시물 제목 2</h2>
          <p className={mainStyle.popPostDate}>2024년 7월 4일</p>
          <p className={mainStyle.popPostExcerpt}>여기에 게시물의 간략한 설명이 들어갑니다. 이 부분은 게시물의 요약 내용을 보여줍니다.</p>
          <a href="#" className={mainStyle.readMore}>더 읽기</a>
        </div>
        <div className={mainStyle.popBlogPost}>
          <img src="/path/to/image3.jpg" alt="Post Image 3" className={mainStyle.postImage} />
          <h2 className={mainStyle.popPostTitle}>게시물 제목 3</h2>
          <p className={mainStyle.popPostDate}>2024년 7월 3일</p>
          <p className={mainStyle.popPostExcerpt}>여기에 게시물의 간략한 설명이 들어갑니다. 이 부분은 게시물의 요약 내용을 보여줍니다.</p>
          <a href="#" className={mainStyle.readMore}>더 읽기</a>
        </div>
      </div>

      <h2>
        게시물 목록(실시간 SSR로 동기화)
      </h2>
      <div className={mainStyle.blogList}>
        <div className={mainStyle.blogPost}>
            <h2 className={mainStyle.postTitle}>게시물 제목 1</h2>
            <p className={mainStyle.postDate}>2024년 7월 5일</p>
            <p className={mainStyle.postExcerpt}>여기에 게시물의 간략한 설명이 들어갑니다. 이 부분은 게시물의 요약 내용을 보여줍니다.</p>
            <a href="#" className={mainStyle.readMore}>더 읽기</a>
        </div>
        <div className={mainStyle.blogPost}>
            <h2 className={mainStyle.postTitle}>게시물 제목 2</h2>
            <p className={mainStyle.postDate}>2024년 7월 4일</p>
            <p className={mainStyle.postExcerpt}>여기에 게시물의 간략한 설명이 들어갑니다. 이 부분은 게시물의 요약 내용을 보여줍니다.</p>
            <Link href="/about" className={mainStyle.readMore}>더 읽기</Link>
        </div>
      </div> */}
      <Link href="/SSG">
        <button className={mainStyle.button}>SSG 페이지로 이동</button>
      </Link>

      <Link href="/ISR">
        <button className={mainStyle.button}>ISR 페이지로 이동</button>
      </Link>

      <Link href="/SSR">
        <button className={mainStyle.button}>SSR 페이지로 이동 (fetch)</button>
      </Link>

      <Link href="/SSR2">
        <button className={mainStyle.button}>SSR2 페이지로 이동 (axios)</button>
      </Link>

      <Link href="/about">
        <button className={mainStyle.button}>About 페이지로 이동</button>
      </Link>
    </main>
  );
}