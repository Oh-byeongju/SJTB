import React from 'react';
import Link from 'next/link';
import styles from '@/style/page.module.css';

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      <div>
        이것은 테스트 페이지<br/>
				메인 페이지입니다.
      </div>
      <Link href="/about">
        <button className={styles.button}>About 페이지로 이동</button>
      </Link>
    </main>
  );
}

export default Home;
