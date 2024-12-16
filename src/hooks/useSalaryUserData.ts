import { useState, useEffect } from 'react';

import { supabase } from '../../supabaseConfig';

import { SalaryUserData } from '@/types/salary';

export default function useSalaryUserData() {
	const [rowItems, setRowItems] = useState<SalaryUserData[]>([]);

	useEffect(() => {
		const fetchAttendanceData = async () => {
			console.log('급여 데이터 fetch 시작');

			const { data, error } = await supabase
				.from('attendance')
				.select('*')
				.order('total_work_hours', { ascending: false });

			if (error) {
				console.error('Error fetching data:', error);
			} else {
				const reorderedData: SalaryUserData[] = data.map((item) => ({
					급여해: item.year,
					급여월: item.payment_month,
					급여지급일: item.payment_day,
					지급총액: item.base_salary,
					실지급액: item.total_salary,
					이름: item.user_name,
					세금공제: item.tax_deduction,
					보험공제: item.insurance_deduction,
					id: item.id,
				}));
				setRowItems(reorderedData);
			}
		};

		fetchAttendanceData();
	}, []);

	return { rowItems };
}
