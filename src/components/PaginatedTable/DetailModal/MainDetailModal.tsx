import useSalaryUserData from '../../../hooks/useSalaryUserData';
import DetailModal from './detailModal';
import { useAppSelector } from '@/hooks/useRedux';

export default function MainDetailModal() {
	const year = useAppSelector((state) => state.schedule.year);
	const month = useAppSelector((state) => state.schedule.month);

	const { rowItems: rowItems } = useSalaryUserData();

	const filteredYear = rowItems.filter((cur) => Number(cur.급여해) === year);

	const filterMonth = filteredYear.filter((cur) => Number(cur.급여월.slice(5, 7)) === month);

	return (
		<>
			{filterMonth.length > 0 ? (
				<DetailModal data={filterMonth[0]} />
			) : (
				<div>데이터를 불러오는 중입니다...</div>
			)}
		</>
	);
}
