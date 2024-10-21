import axios from 'axios';

// axios instance 생성
export const http = axios.create({
	headers: {
		// 'Cache-Control': 'no-cache',
		// 'Pragma': 'no-cache',
		// 'Expires': '0'
	},
    baseURL: "http://localhost:8080", // 백엔드 주소
	withCredentials: true
});