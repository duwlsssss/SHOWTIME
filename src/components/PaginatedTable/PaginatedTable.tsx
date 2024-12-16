import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useSalaryUserData from '../../hooks/useSalaryUserData';

import dayjs from 'dayjs';
import Table, { RowItem } from '../table/Table';
import Pagination from '../pagination/pagination';
import { Modal, ModalPortal } from '@/components';
import SalarySelect from '@/components/salaryselect/SalarySelect';
import EditModal from './EditModal/editModal';
import DetailModal from './DetailModal/detailModal';
import CheckingResult from './CheckingResult/checkingResult';

const headerItems: string[] = [
	'급여월',
	'급여지급일',
	'지급총액',
	'실지급액',
	'급여명세',
	'정정신청',
];

const itemsPerPage = 5;

export default function PaginatedTable() {
	//모달창 변수들
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<'edit' | 'detail' | null>(null);

	const openModal = (type: 'edit' | 'detail') => {
		setIsModalOpen(true);
		setModalType(type);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setModalType(null);
	};

	//데이터 상태
	const [selectedYear, setSelectedYear] = useState<string>('2024');
	const [selectedMonth, setSelectedMonth] = useState<string>('01');
	const [filteredItems, setFilteredItems] = useState<RowItem[]>([]);
	const [diffInDays, setDiffInDays] = useState<number | null>(null);

	//supabase 조회 커스텀훅
	const { rowItems: rowItems } = useSalaryUserData();

	useEffect(() => {
		if (filteredItems.length > 0) {
			const salaryDate = filteredItems[0].급여지급일;
			console.log('급여지급일:', salaryDate);

			const supabaseDate = dayjs(salaryDate, 'YYYY-MM-DD');
			if (supabaseDate.isValid()) {
				const today = dayjs();
				const difference = supabaseDate.diff(today, 'day');
				setDiffInDays(difference);
			} else {
				console.error('유효하지 않은 날짜 형식:', salaryDate);
				setDiffInDays(null);
			}
		} else {
			setDiffInDays(null);
		}
	}, [filteredItems]);

	const btnText =
		diffInDays !== null ? (diffInDays >= -14 ? '정정신청' : '정정신청불가') : '정정신청불가';

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData: RowItem[] = filteredItems.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

	//select로 데이터 필터해서 테이블에 데이터 띄울 훅
	useEffect(() => {
		const filteredData = rowItems
			.filter((cur) => cur.급여월.substring(0, 4) === selectedYear)
			.filter((cur) => cur.급여월.substring(5, 7) === selectedMonth);
		setFilteredItems(filteredData);
	}, [selectedYear, selectedMonth, rowItems]);

	const getBtnContent = () => {
		return {
			btnText: '확인하기',
			btnColor: 'blue',
			onClickBtn: () => openModal('detail'),
		};
	};

	return (
		<>
			<SalarySelect
				value={selectedYear}
				value1={selectedMonth}
				onChange={(value) => {
					setSelectedYear(value);
					setSelectedMonth('');
				}}
				onChange1={(value1) => {
					setSelectedMonth(value1);
				}}
			/>

			<NavLink to="/application-details">
				<CheckingResult />
			</NavLink>
			{filteredItems.length > 0 ? (
				<Table
					data={paginatedData}
					headerItems={headerItems}
					btnContent={getBtnContent}
					btnEdit={{
						btnText: btnText,
						btnColor: 'blue',
						onClickBtn: () => openModal('edit'),
					}}
					condition={diffInDays}
				>
					{isModalOpen && (
						<ModalPortal>
							<Modal onClose={closeModal}>
								{modalType === 'detail' && <DetailModal data={paginatedData[0]} />}
								{modalType === 'edit' && <EditModal data={paginatedData[0] as RowItem} />}
							</Modal>
						</ModalPortal>
					)}
				</Table>
			) : (
				<p style={{ textAlign: 'center', marginTop: 40 }}>
					해당 기간의 급여 내역이 존재하지 않습니다.
				</p>
			)}

			{filteredItems.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</>
	);
}
