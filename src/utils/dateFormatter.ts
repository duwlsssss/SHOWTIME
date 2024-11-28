export const formatToKoreanTime = (date: Date) => {
	const koreaTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
	const year = koreaTime.getFullYear();
	const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
	const day = String(koreaTime.getDate()).padStart(2, '0');
	const hour = String(koreaTime.getHours()).padStart(2, '0');
	const minute = String(koreaTime.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day} ${hour}:${minute}`;
};
