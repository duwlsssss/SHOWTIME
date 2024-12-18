/**
 *  DB에는 UTC로 저장
 * 화면에는 KST로 표시
 * 날짜 비교도 KST 기준으로 수행
 */

// UTC -> KST 변환 (yyyy-MM-ddTHH:mm 형식)
export const formatDateTime = (utcDate: Date) => {
	const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
	return kstDate.toISOString().slice(0, 16);
};

// UTC -> KST 변환 (yyyy-MM-dd 형식)
export const formatDate = (utcDate: Date) => {
	const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
	return kstDate.toISOString().slice(0, 10);
};

// UTC -> KST 변환 (시간)
export const formatTime = (utcDate: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		timeZone: 'Asia/Seoul',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(utcDate);
};

// 한국어 날짜 포맷으로 변환
export const formatToKoreanDate = (date: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		month: 'long',
		day: 'numeric',
		timeZone: 'Asia/Seoul',
	}).format(date);
};

// 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
export const formatCalendarDay = (_locale: string | undefined, utcDate: Date) => {
	const day = utcDate.getDate();
	return day < 10 ? `0${day}` : `${day}`;
};

// KST 기준으로 시간 비교
export const isSameTime = (d1: Date, d2: Date): boolean => {
	return formatTime(d1) === formatTime(d2);
};

// KST 기준으로 날짜 비교
export const isSameDate = (d1: Date, d2: Date): boolean => {
	return formatDate(d1) === formatDate(d2);
};

// KST 기준으로 날짜, 시간 비교
export const isSameDateTime = (d1: Date, d2: Date): boolean => {
	return formatDateTime(d1) === formatDateTime(d2);
};

// 분을 '00'으로 고정
export const fixMinute = (value: string) => {
	const [date, time] = value.split('T');
	const [hours] = time.split(':');
	return `${date}T${hours}:00`;
};
