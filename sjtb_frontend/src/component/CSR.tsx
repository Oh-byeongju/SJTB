'use client';

// CSR 데이터 가져오기
async function getSpringDataCSR() {
    console.log('CSR 첫번째 페이지 동작');
  
    try {
      const res = await fetch(`http://localhost:8080/message/SSR`);
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

// eslint-disable-next-line @next/next/no-async-client-component
export default async function CSR() {
    const CSR = await getSpringDataCSR();
  
    return (
        <>
            <h2>CSR</h2>
            <p>{CSR ? CSR.msg: '없음4'}</p> {/* CSR 데이터 출력 */}
        </>
    );
  }