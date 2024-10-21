import { Metadata } from 'next';
import Link from 'next/link';
import mainStyle from '@/style/main.module.css';
import CSR from '@/component/CSR';

export const metadata: Metadata = {
  title: 'SSG Page',
};

// SSG 데이터 가져오기
async function getSpringDataSSG() {
  const res = await fetch(`http://localhost:8080/message/SSG`, { cache: 'force-cache' });
  const data = await res.json();
  console.log('SSG -> ' + data.msg);
  return JSON.stringify('SSG -> ' + data.msg); // 데이터를 JSON 문자열로 변환하여 반환
}


export default async function SSG() {
  const SSG = await getSpringDataSSG();

  return (
    <main className={mainStyle.main}>
      <div>
        <h1>SSG Page</h1>
        <div>
          <h2>SSG11111111222222222</h2>
          <p>{SSG}</p>
        </div>
        <CSR/>
      </div>
      <Link href="/">
        <button className={mainStyle.button}>메인 페이지로 이동</button>
      </Link>
    </main>
  );
};
