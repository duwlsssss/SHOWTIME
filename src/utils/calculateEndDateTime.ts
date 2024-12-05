export default function calculateEndDateTime(start_date_time: Date | string, time: string): Date {
	const hours = Number(time);
	const endDateTime = new Date(start_date_time);

	endDateTime.setUTCHours(endDateTime.getUTCHours() + (hours ?? 0));

	return endDateTime;
}
