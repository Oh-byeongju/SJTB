import {revalidateTag, revalidatePath} from "next/cache";

import { Metadata } from 'next';
import Link from 'next/link';
import mainStyle from '@/style/main.module.css';

// 동적 메타 태그 설정
export async function generateMetadata(): Promise<Metadata> {
  // locale 에 따라 동적으로 번역해주는 함수
  const data = await getSpringDataISR();

  return {
    title: data.msg
  };
}

// ISR 데이터 가져오기
async function getSpringDataISR() {
  const res = await fetch(`http://localhost:8080/message/ISR`, { next: { revalidate: 5 }});
  const data = await res.json();
  console.log('ISR -> ' + data.msg);
  return data; // JSON 객체를 직접 반환
}

async function test() {
  'use server'; 	// 서버액션을 생성해서
  // 특정 경로만 날리고 싶은데 .... 브라우저에서 모든 경로 이동시 다시 받아오는거 같음
  revalidateTag('ISR'); //요청 후 해당 경로를 무효화 시켜준다.
  revalidatePath('ISR'); //요청 후 해당 경로를 무효화 시켜준다.
}

export default async function ISR() {
  const data = await getSpringDataISR();

  return (
    <main className={mainStyle.main}>
      <div>
        <h1>ISR Page</h1>
        <div>
          <h2>ISR</h2>
          <p>{data.msg}</p> {/* 데이터의 msg 속성 값을 렌더링 */}
        </div>

        <h1>
          <form action={test}>
            <button type="submit">
              테스트 버튼 revalidatePath 초기화
            </button>
          </form>
        </h1>
      </div>
      <Link href="/">
        <button className={mainStyle.button}>메인 페이지로 이동</button>
      </Link>
    </main>
  );
}
