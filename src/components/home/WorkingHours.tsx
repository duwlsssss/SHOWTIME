import { useState, useEffect } from 'react';
import * as S from './MainLayout.styles';
import { useAppSelector } from '@/hooks/useRedux';
import { useWorkingHours } from '@/hooks/useWorkingHours';
import useIsAdmin from '@/hooks/useIsAdmin';

const formatHours = (hours: number) => {
	return `${Math.round(hours)}시간`;
};

export function WorkingHours() {
	const [hours, setHours] = useState({ weeklyHours: 0, monthlyHours: 0 });
	const user = useAppSelector((state) => state.user.user);
	const { fetchWorkHours } = useWorkingHours();

	const isAdmin = useIsAdmin();

	useEffect(() => {
		const getWorkHours = async () => {
			if (!user?.id) return;

			const { weekResult, monthResult } = await fetchWorkHours(user.id);
			setHours({
				weeklyHours: weekResult.data?.weekly_hours || 0,
				monthlyHours: monthResult.data?.monthly_hours || 0,
			});
		};

		getWorkHours();
	}, [user?.id]);

	const workPercentage = Math.min(Math.round((hours.weeklyHours / 52) * 100), 100);

	return (
		<S.WorkingHoursContainer>
			{!isAdmin ? (
				<>
					<S.WorkingHoursWrapper>
						<S.WorkingHoursInfo>
							<S.InfoLabel>이번 주 근무 시간</S.InfoLabel>
							<S.InfoValue>{formatHours(hours.weeklyHours)}</S.InfoValue>
						</S.WorkingHoursInfo>
						<S.WorkingHoursInfo>
							<S.InfoLabel>이번 달 근무 시간</S.InfoLabel>
							<S.InfoValue>{formatHours(hours.monthlyHours)}</S.InfoValue>
						</S.WorkingHoursInfo>
					</S.WorkingHoursWrapper>
					<S.ChartContainer>
						<S.WorkTimeChart $percentage={workPercentage}>
							<S.ChartCenter>{workPercentage}%</S.ChartCenter>
						</S.WorkTimeChart>
					</S.ChartContainer>
				</>
			) : null}
		</S.WorkingHoursContainer>
	);
}
