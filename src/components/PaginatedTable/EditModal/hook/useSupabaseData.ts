import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type RowItem = {
	급여해: string;
	id: number;
	이름: string;
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
	보험공제: string;
};

export default function useSupabaseData() {
	const [rowItems, setRowItems] = useState<RowItem[]>([]);

	useEffect(() => {
		const fetchAttendanceData = async () => {
			const { data, error } = await supabase
				.from('attendance')
				.select('*')
				.order('total_work_hours', { ascending: false });

			if (error) {
				console.error('Error fetching data:', error);
			} else {
				const reorderedData: RowItem[] = data.map((item) => ({
					급여해: item.year,
					급여월: item.payment_month,
					급여지급일: item.payment_day,
					지급총액: item.base_salary,
					실지급액: item.total_salary,
					이름: item.user_name,
					보험공제: item.tax_deduction,
					id: item.id,
				}));
				setRowItems(reorderedData);
			}
		};

		fetchAttendanceData();
	}, []);
	return { rowItems };
}
