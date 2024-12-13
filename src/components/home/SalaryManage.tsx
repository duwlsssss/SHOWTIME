import { useState, useEffect } from 'react';
import * as S from './MainLayout.styles';
import { createClient } from '@supabase/supabase-js';
import { useAppSelector } from '@/hooks/useRedux';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type EmployeeSalary = {
	user_name: string;
	total_salary: number;
	payment_month: string;
};

export function SalaryManage() {
	const year = useAppSelector((state) => state.schedule.year);
	const month = useAppSelector((state) => state.schedule.month);

	const [salaryList, setSalaryList] = useState<EmployeeSalary[]>();

	useEffect(() => {
		const fetchEmployeeSalaryData = async () => {
			const { data, error } = await supabase
				.from('attendance')
				.select(
					`
					user_name,
					total_salary,
					payment_month
				`,
				)
				.like('payment_month', `${year}-${String(month).padStart(2, '0')}%`);
			if (error) {
				console.error('Error fetching employeeSalary data:', error);
			} else {
				setSalaryList(data);
			}
		};

		fetchEmployeeSalaryData();
	}, [year, month]);

	const goToSalaryManagePage = () => {
		window.location.href = '/salary-management';
	};

	return (
		<S.SalaryManageList>
			{salaryList &&
				salaryList.map((data) => (
					<S.SalaryManageContent key={data.payment_month} onClick={goToSalaryManagePage}>
						<p>{data.user_name}</p>
						<p>{data.total_salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
					</S.SalaryManageContent>
				))}
		</S.SalaryManageList>
	);
}
