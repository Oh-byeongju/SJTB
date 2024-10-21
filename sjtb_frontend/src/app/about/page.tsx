import mainStyle from '@/style/main.module.scss';
import h1Style from '@/style/h1.module.css';

import { MilkdownEditorWrapper } from '@/component/MilkdownEditorWrapper';

export default function About() {
  return (
    <main className={mainStyle.main}>
      <h1 className={h1Style.h1}>
        제목 입력 부분
      </h1>
      <div className={h1Style.editor}>
        {/* 이런식으로 provider 안에 감싸야하는듯 */}
        <MilkdownEditorWrapper/>
      </div>
    </main>
  );
};
