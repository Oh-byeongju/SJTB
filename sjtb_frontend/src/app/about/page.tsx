import React from 'react';
import Link from 'next/link';
import styles from '@/style/page.module.css';

const About: React.FC = () => {
  return (
    <main className={styles.main}>
      <h1>About Page</h1>
      <div>
        이것은 어바웃 페이지입니다.<br/>
				두번째 페이지이죠
      </div>
      <Link href="/">
        <button>홈으로 돌아가기</button>
      </Link>
    </main>
  );
}

export default About;
