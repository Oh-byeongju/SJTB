'use client'

import { useEffect, useRef } from 'react';
import mainStyle from '@/style/main.module.scss';
import { Crepe } from '@/crepe/core/crepe.ts';
import "@/crepe/theme/common/style.css";
import "@/crepe/theme/frame/style.css";

export default function About() {
  const crepeRef = useRef<Crepe | null>(null);

  useEffect(() => {
    const rootElement = document.getElementById('111112222');

    if (rootElement && !crepeRef.current) { // crepeRef가 null일 때만 생성
      crepeRef.current = new Crepe({
        root: rootElement,
        defaultValue: 'Hello, Milkdown!',
      });

      // 에디터 생성
      crepeRef.current.create().then(() => {
        console.log('Editor created');
      });
    }
  }, []); // 빈 배열을 전달하여 처음 마운트될 때만 실행

  const onClick = () => {
    if (crepeRef.current) {
      console.log(crepeRef.current.getMarkdown());
    }
  };

  return (
      <main className={mainStyle.main}>
        <h1>fdsafsadfasd</h1>
        <button onClick={onClick}>눌러라우</button>
        <div id='111112222'></div>
      </main>
  );
};
