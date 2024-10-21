export const dynamic = "force-dynamic"

import { Metadata } from 'next';
import Link from 'next/link';
import mainStyle from '@/style/main.module.css';
import axios from 'axios';

export const metadata: Metadata = {
  title: 'SSR Page',
};

// SSG 데이터 가져오기
async function getSpringDataSSG() {
  console.log('SSG 두번째 페이지 동작');

  try {
    const response = await axios.get(`http://localhost:8080/message/SSG`, {
      headers: {
        // 필요한 헤더 추가
        'Cache-Control': 'force-cache',
      },
    });
    console.log('SSG -> ' + response.data.msg);
    return response.data; // JSON 객체를 직접 반환
  } catch (error) {
    console.error('Error fetching SSG data:', error);
    return null; // 오류 발생 시 null 반환
  }
}

// ISR 테스트
async function getSpringDataISR() {
  console.log('ISG 두번째 페이지 동작');
  try {
    const response = await axios.get(`http://localhost:8080/message/ISR`, {
      params: { revalidate: 30 }, // 파라미터 전달
    });
    console.log('ISR -> ' + response.data.msg);
    return response.data; // JSON 객체를 직접 반환
  } catch (error) {
    console.error('Error fetching ISR data:', error);
    return null; // 오류 발생 시 null 반환
  }
}

// SSR 데이터 가져오기
async function getSpringDataSSR() {
  console.log('SSR 두번째 페이지 동작');

  try {
    const response = await axios.get(`http://localhost:8080/message/SSR`, {
      headers: {
        // 필요한 헤더 추가
        'Cache-Control': 'no-cache',
      },
    });
    console.log('SSR -> ' + response.data.msg);
    return response.data; // JSON 객체를 직접 반환
  } catch (error) {
    console.error('Error fetching SSR data:', error);
    return null; // 오류 발생 시 null 반환
  }
}

export default async function About() {
  const SSG = await getSpringDataSSG();
  const ISR = await getSpringDataISR();
  const SSR = await getSpringDataSSR();

  return (
    <main className={mainStyle.main}>
      <div>
        <h1>About Page22222111111111111112</h1>
        <div>
          <h2>SSG</h2>
          <p>{SSG ? SSG.msg : '없음1'}</p> {/* SSG 데이터 출력 */}
          <h2>ISR</h2>
          <p>{ISR ? ISR.msg : '없음2'}</p>
          <h2>SSR</h2>
          <p>{SSR ? SSR.msg : '없음3'}</p> {/* SSR 데이터 출력 */}
        </div>
      </div>
      <Link href="/">
        <button className={mainStyle.button}>메인 페이지로 이동</button>
      </Link>
    </main>
  );
}
