'use client'

import {useEffect, useRef} from 'react'; // useEffect import
import mainStyle from '@/style/main.module.scss';
import h1Style from '@/style/h1.module.css';
import { Crepe } from '@/crepe/core/crepe.ts';
import "@/crepe/theme/common/style.css";
import "@/crepe/theme/frame/style.css";

export default function About() {
  const crepeRef = useRef<Crepe | null>(null); // Crepe 인스턴스를 useRef로 관리

  useEffect(() => {
    // const crepe = new Crepe({
    //   root: document.getElementById('111112222'),
    //   defaultValue: 'Hello, Milkdown!',
    //
    //
    //   /// 여기에 그냥 history redo undo 설정값 넣고 이 에디터 쓰는게 ??
    //
    //   // 아니면 crepe를 그냥 쓰자 crepe.ts 파일을 까서 그걸 컴포넌트화 시키는게 편할듯
    //
    //
    //   ////crepe를 기반으로 이제 사용을 행햐나ㅡㄴ데
    //   /// 이거 기준으로 쓰면 api 붙이기 힘드니까 crepe.ts를 까서 내가 컴포넌트로 만드는게 낭르듯
    //
    // });




    const rootElement = document.getElementById('111112222');


    // Crepe 인스턴스를 useRef에 저장
    crepeRef.current = new Crepe({
      root: rootElement,
      defaultValue: 'Hello, Milkdown!',
    });

    // // 컴포넌트가 마운트된 후 에디터를 생성
    // // 에디터 생성
    // crepe.create().then(() => {
    //   console.log('Editor created');
    // });

    // 에디터 생성
    crepeRef.current.create().then(() => {
      console.log('Editor created');
    });

    // 컴포넌트 언마운트 시 에디터 제거
    return () => {
      crepeRef.current?.destroy();
      console.log('Editor destroyed');
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

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
