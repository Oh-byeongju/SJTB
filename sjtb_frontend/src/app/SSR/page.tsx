export const dynamic = "force-dynamic"


import { Metadata } from 'next';
import Link from 'next/link';
import mainStyle from '@/style/main.module.css';
import SSR from '@/component/SSR';

export const metadata: Metadata = {
  title: 'SSR Page',
};

/// SSG 데이터 가져오기
async function getSpringDataSSG() {
  console.log('SSG 첫번째 페이지 동작');

  try {
    const res = await fetch(`http://localhost:8080/message/SSG`, { cache: 'force-cache' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log('SSG -> ' + data.msg);
    return data; // JSON 문자열로 변환하지 않고 그대로 반환
  } catch (error) {
    console.error('Error fetching SSG data:', error);
    return null; // 오류 발생 시 null 반환
  }
}

// ISR 테스트
async function getSpringDataISR() {
  try {
    const res = await fetch(`http://localhost:8080/message/ISR`, { next: { revalidate: 10 } });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log('ISR -> ' + data.msg);
    return data; // JSON 객체를 직접 반환
  } catch (error) {
    console.error('Error fetching ISR data:', error);
    return null; // 오류 발생 시 null 반환
  }
}

export default async function About() {
  const SSG = await getSpringDataSSG();
  const ISR = await getSpringDataISR();

  console.log('무조건 동적')
  console.log("fdfdfd")

  return (
    <main className={mainStyle.main}>
      <div>
        <h1>About Pagfdsae</h1>
        <h1>이거 추가 안되제/</h1>
        <div>
          <h2>SSG</h2>
          <p>{SSG ? SSG.msg : '없음1'}</p> {/* SSG 데이터 출력 */}
          <h2>ISR</h2>
          <p>{ISR ? ISR.msg : '없음2'}</p>
          <SSR/>
        </div>
      </div>
      <Link href="/">
        <button className={mainStyle.button}>메인 페이지로 이동</button>
      </Link>
    </main>
  );
}


////////// AXIOS 는 사용 불가
///////// AXIOS를 쓰면 안되는 이유가 요청 자체에서 컨트롤이 불가능합니다.
///////// 이 케이스가 왜 문제냐? 하나의 페이지에서 SSG, SSR ISR 컴포넌트를 구분하여 호출할 경우가 있는데
////////// AXIOS를 쓰면 이 페이지가 SSR이다, 이 페이지가 ISR이다 이렇게 전역(?)으로 구분을 할 수 밖에없음
////////////export const dynamic = "force-dynamic" 이런거 붙이거나 export const revalidate = 10이런거 붙이면 페이지 자체 컨트롤이 가능해지는데
///////////////// 이러면 내부 요소 하나하나 캐치를 하는게 아니라서 정상적으로 작동안함



///// 정리본 오케이
//// 오케이
// nextJs는 npm run build를 실행하는 경우 .next 디렉토리가 생성됩니다. 이 디렉토리에 페이지렌더링 시 필요한 데이터가 들어가 있습니다.
//// SSG : { cache: 'force-cache' }); 이렇게 사용하면 함수는 실행되지만 .next 디렉토리의 js 내부의 스태틱 값을 사용함,,,,,,, 함수가 실행되는거처럼 보이는 것 실행안됨
//// ISR : { next: { revalidate: 3600 }}); 이렇게 사용하면 함수는 실행되지만, .next 디렉토리의 값을 우선으로 사용하고 revalidate 시간을 기준으로 api를 호출하던지 함
//// SSR : { cache: 'no-store' }); 이렇게 사용하면 함수도 실행되고, API도 무조건 호출


/// npm run build 이슈
/// 빌드할 때 .next 디렉토리를 삭제 안하면 SSG 부분이 새롭게 갱신이 안되는 이슈가 있을수도 있음
/// .next 디렉토리 삭제 X : SSG 갱신안됨, ISR, SSR 갱신됨
/// .next 디렉토리 삭제 O : SSG, ISR, SSR 모두 갱신
/// 우리 프로젝트의 기준으로 보았을 때, ISR이 대부분일 것으로 기대 되므로 삭제 필요없이 npm run build 해도됨
/// SSG 부분도 revalidate 부분을 엄청 길게 잡으면 ISR과 비슷하게 구현이 가능할 것으로 기대
//// npm run build 빌드시 .next를 삭제해야 기존에 있던 ssg 가 제대로 구성됨 -> 기존 캐시를 제거하고 해야한다는 의미 -> 운영 배포 시 디렉토리 제거 후 빌드 해야함


//// try catch 구문
/// 빌드 시 
/// SSG : api 서버가 안될경우 빌드가 안됨 -> try catch가 사실상 불가
/// ISR : api 서버가 안될경우 revalidate가 안됨 -> try catch가 되지만, 데이터 갱신 주기가 되어 새롭게 갱신하려고 할 때, API 서버가 꺼져있는 경우 가장 직전의 데이터를 표출해주는 오류가 있음
/// SSR : api 서버가 안될경우 catch문의 데이터 사용 가능



// page.tsx 캐싱 이슈
// page.tsx에서 SSR : { cache: 'no-store' }); 을 사용하면 캐싱에 대한 오류가 발생할 수도 있음
// 최상단에 export const dynamic = "force-dynamic"를 적어주면 캐시를 무시하여 이슈가 사라집니다.
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config 문서 참고
///ISR,SSR,SSG 정리 요소
///page.tsx 기준으로 내부 컴포너트에 fetch에 따른 SSR 요소가 들어가 있으면 최상단에 export const dynamic = "force-dynamic"을 적용해야함
/// export const dynamic = "force-dynamic"이 적용된 page.tsx는 모든 요청을 캐싱하지 않는다
/// SSR을 쓴다는 것 => 정적인 요소는 그대로 있으나 동적인 요소는 바뀔 수 있다.





 ////////// 완료


//// 한 page.tsx에 모든 자식 요소를 기준으로 ssg, isr, ssr 요소가 동시에 있으면
//// 우선 순위가 ssr > isr > ssg 순서대로 봐줘야함
//// 가장 상단의 page.tsx를 기준에서 봤을 때, 모든 자식 컴포넌트에서 SSR이 하나라도 있으면 그 페이지 자체는 항상 동적 생성의 개념으로 생각해야함
//////////////// 이것의 의미가 빌드된 .next > server > app 디렉토리를 확인하였을 때, 페이지 URL을 기준으로 .html 파일이 있으면 SSG와 ISR로만 구현된 스태틱 페이지
//////////////// 그것이 아니라 page.js만 존재한다면 항상 페이지를 새롭게 구현해야하는 다이나믹 페이지
//////////////// 당연하게도 html을 그대로 준다고 가정하면 사용자 입장에서 더 빠르게 페이지를 볼 수 있음

//////////////// SSG와 SSR로만 구현된 경우 : 사용자 request > 노드 JS 서버에서 사전에 만들어준 html response
/////////////// SSR 요소가 들어간 경우 : 사용자 request > 노드 JS 서버에서 빌드된 자바스크립트 파일을 기준으로 html 생성(이 과정에서 API 요청을 할수도 있고 정적으로생성된 데이터를 이용하기도 함) > html response





///////////////////////완료



//// 이제 여기서 우리는 제대로 봐야하는게 SSR이 많다 ? 그만큼 페이지리턴이 늦을수 밖에 없다.






/////////////여기 이후로 잘 적어보기



//// 빌드된 page.js를 확인해보면 고정으로 하드타이핑된 태그들이나, 스태틱요소는 하드코딩 되어있는것을 확인 가능 > 이 부분은 페이지 생성에 시간을 최대한 아끼려고 하는것이 보임
///////////////////// ex) ("div",{children:[s.jsx("h1",{children:"About Page"}),(0,s.jsxs) 이런 식으로 js에서 바로 구현이 가능하게 되어있음
//// 하지만 동적인 요소가 들어간 ssr 같은경우 항상 api를 요청하는것을 확인 가능
//////////////// 여기서 중요한게 노드 js 자원 즉, 현 프로젝트에서 구현한 함수를 이용하여 노드 자원을 읽는것은 api 요청 없이, 함수가 실행되는 개념이므로 api보다 빠름

//// isr이 있는 경우 isr 주기에 맞춰 동적으로 페이지를 생성하여 전달함
/// { next: { revalidate: 30 }}) -> 페이지에 이런 요소가 존재한다면, 이 페이지는 30초마다 동적으로 생성된다는 의미

//////////// 미쳤다. isr로 구현해두면 빌드된 html 파일을 그부분만 자기가 알아서계속 수정함 (주기별로) 이건 우째해놨노 얘들은












//// 여기서 recoil 등은 layout에 할당하여 사용하는 이유가 라우터를 이용하여 페이지를 이동할 때는 layout.tsx는 변경 안되기 떄문에 
//// 전역으로 사용하는 함수 및 팝업, 컴포넌트 등은 layout에 서버 사이드 개념으로 할당

/////////////// 먼저 봐야할 것
/////////////////1. 페이지가 동적인가 정적인가
///////////////// slug를 사용하는 경우 무조건 페이지는 동적으로 사용됨
////////////////// //// 정적으로 사용하려는 경우 generateStaticParams을 사용

//////////////// 2. 내부 컴포넌트에 서버사이드의 동적인 요소가 존재하는가?
/////////////////// 내부 컴포넌트에 서버사이드 동적요소가 있는 경우 export const dynamic = "force-dynamic" 적어줘야함
/////////////////// 저걸 적으면 nextjs에서 알아서 렌더링 퍼포먼스를 지키면서 해줌





////////////이후로 보기
///////////이거만 정리하면 끝



/// slug를 사용하면 모든 페이지는 무조건 SSR로 구성되는데 SSR로 구성되어있다 하더라도 static 요소는 js에서 고정값으로 들어가있기 때문에 퍼포먼스 저하가 크게없다.
//////////////////// nextjs 너는 천재야
/// slug를 사용하였을 때 SSR이 아니라 페이지 자체를 SSG로 하려면 generateStaticParams을 사용해야 페이지 자체를 ssg로 구현
//// 따라서 현재 프로젝트에서 구현되어있는 blog 페이지는 내부 페이지는 ssr로 구현이 될 수 밖에 없으니, api 요청없이 노드 자원에 있는 md파일을 읽어 페이지를 만들어서 response해주면
///// 퍼포먼스를 지키면서 페이지 리턴이 가능



