// SSR 데이터 가져오기
async function getSpringDataSSR() {
    console.log('SSR 첫번째 페이지 동작');
  
    try {
      const res = await fetch(`http://localhost:8080/message/SSR`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('SSR -> ' + data.msg);
      return data; // 데이터를 JSON 문자열로 변환하여 반환
    } catch (error) {
      console.error('Error fetching SSR data:', error);
      return null; // 오류 발생 시 null 반환
    }
}

export default async function SSR() {
    const SSR = await getSpringDataSSR();
  
    return (
        <>
            <h2>SSR</h2>
            <p>{SSR ? SSR.msg: '없음3'}</p> {/* SSR 데이터 출력 */}
        </>
    );
  }