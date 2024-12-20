import { useState } from 'react';
import { supabase } from '../../supabaseConfig';
import { ManageRowItem, RequestData } from '@/types/salary';

const getOvertimePay = async (attendanceId) => {
	const { data, error } = await supabase
		.from('attendance')
		.select('overtime_pay')
		.eq('id', attendanceId)
		.single();

	if (error) {
		console.error('Error fetching overtime_pay:', error);
		return null;
	} else {
		return data.overtime_pay;
	}
};

export const updateAttendanceRuest = async (formData, status) => {
	if (!formData.requestId || !formData.selectOption) {
		alert('필수 항목이 비어있습니다.');
		return;
	}

	try {
		if (status === '승인') {
			const currentOvertimePay = await getOvertimePay(formData.attendanceId);
			if (currentOvertimePay === null) {
				alert('overtime_pay 값을 가져오는 데 실패했습니다.');
				return;
			}
			// 새로운 overtime_pay 값 계산
			const newOvertimePay = Number(currentOvertimePay) + Number(formData.requestSalary);

			// attendance의 overtime_pay 변경
			const { error: attendanceError } = await supabase
				.from('attendance')
				.update({
					overtime_pay: newOvertimePay,
				})
				.eq('id', `${formData.attendanceId}`);

			if (attendanceError) {
				console.error('Error updating Attendance data: ', attendanceError);
			}
		}

		// attendance_request의 상태 변경
		const { error: requestError } = await supabase
			.from('attendance_request')
			.update({
				status: formData.selectOption,
				status_reason: formData.statusReason,
				updated_at: new Date().toISOString(),
			})
			.eq('id', `${formData.requestId}`);

		if (requestError) {
			console.error('Error updating Request data:', requestError);
		}
	} catch (error) {
		console.error('Error occured: ', error);
		alert('처리 반영에 오류가 발생했습니다');
	}

	alert('처리가 완료되었습니다.');
	location.reload();
};

export function useAttendanceRequestData() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [attendanceRequestData, setAttendanceRequestData] = useState<ManageRowItem[]>([]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const getAttendanceRequestData = async (selectedYear: string, selectedMonth: string) => {
		const pageSize = 5;
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		let totalCount = 0;

		const getAttendanceRequestCount = async () => {
			const { count, error: countError } = await supabase
				.from('attendance_request')
				.select(
					`
          id,
          attendance!inner (
            payment_month
          )
        `,
					{ count: 'exact' },
				)
				.like('attendance.payment_month', `${selectedYear}-${selectedMonth}%`);

			if (countError) {
				console.error('Error fetching total count:', countError);
			} else {
				totalCount = count || 0;
				setTotalPage(Math.ceil(totalCount / pageSize));
			}
		};

		const fetchAttendanceRequestData = async () => {
			const { data, error } = await supabase
				.from('attendance_request')
				.select(
					`
          created_at,
          status,
          id,
          requested_amount,
          reason,
          status_reason,
          attendance!inner (
            user_name,
            payment_month,
            payment_day,
            total_salary,
            id
          )
        `,
				)
				.like(
					'attendance.payment_month',
					`${selectedYear}-${String(selectedMonth).padStart(2, '0')}%`,
				)
				.order('created_at', { ascending: false })
				.range(startIndex, endIndex - 1);

			if (error) {
				console.error('Error fetching data:', error);
			} else {
				const reorderedData: ManageRowItem[] = data.map((item: RequestData) => {
					const attendance = Array.isArray(item.attendance) ? item.attendance[0] : item.attendance;
					return {
						신청인: attendance?.user_name,
						급여월: attendance?.payment_month,
						급여지급일: attendance?.payment_day,
						지급예정금액: attendance?.total_salary,
						id: attendance?.id,
						상태: item.status,
						사유: item.reason,
						정정신청금액: item.requested_amount,
						처리사유: item.status_reason,
						신청id: item.id,
					};
				});
				setAttendanceRequestData(reorderedData);
			}
		};

		await getAttendanceRequestCount();
		await fetchAttendanceRequestData();
	};

	return {
		currentPage,
		setCurrentPage,
		totalPage,
		attendanceRequestData,
		handlePageChange,
		getAttendanceRequestData,
	};
}
