import { useState, useEffect } from 'react';
import Table from '../table/table';
import Pagination from '../pagination/pagination';
import { Modal } from '@/components/modal/Modal';
import SalarySelect from '@/components/salaryselect/salarySelect';
import ModalPortal from '@/components/modal/ModalPortal';
import { createClient } from '@supabase/supabase-js';
import EditModal from './EditModal/editModal';
import DetailModal from './DetailModal/detailModal';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
	id: string;
}

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
	//모달창 변수들
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<'edit' | 'detail' | null>(null);

	const openModal = (type: 'edit' | 'detail') => {
		console.log('Opening modal:', type); // 디버깅용
		setIsModalOpen(true);
		setModalType(type);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setModalType(null);
	};

	//데이터 상태
	const [rowItems, setRowItems] = useState<RowItem[]>([]);
	const [selectedYear, setSelectedYear] = useState<string>('2024');
	const [selectedMonth, setSelectedMonth] = useState<string>('01');
	const [filteredItems, setFilteredItems] = useState<RowItem[]>([]);

	useEffect(() => {
		const fetchAttendanceData = async () => {
			const { data, error } = await supabase
				.from('attendance')
				.select(
					'base_salary, total_salary, payment_day, payment_month,id,user_name,tax_deduction,insurance_deduction',
				)
				.order('total_work_hours', { ascending: false });

			if (error) {
				console.error('Error fetching data:', error);
			} else {
				const reorderedData: RowItem[] = data.map((item) => ({
					급여월: item.payment_month,
					급여지급일: item.payment_day,
					지급총액: item.base_salary,
					실지급액: item.total_salary,
					이름: item.user_name,
					보험공제: item.tax_deduction,
					세금공제: item.insurance_deduction,
					id: item.id,
				}));
				setRowItems(reorderedData);
			}
		};

		fetchAttendanceData();
	}, []);

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData: RowItem[] = filteredItems.slice(startIndex, endIndex);

	const totalPages = Math.ceil(rowItems.length / itemsPerPage);

	//select로 데이터 필터해서 테이블에 데이터 띄울 훅
	useEffect(() => {
		const filteredData = rowItems
			.filter((cur) => cur.급여월.substring(0, 4) === selectedYear)
			.filter((cur) => cur.급여월.substring(5, 7) === selectedMonth);
		setFilteredItems(filteredData);
	}, [selectedYear, selectedMonth, rowItems]);

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
			<Table
				data={paginatedData}
				headerItems={headerItems}
				btnContent={{
					btnText: '확인하기',
					btnColor: 'blue',
					onClickBtn: () => openModal('detail'),
				}}
				btnContent1={{
					btnText: '정정신청',
					btnColor: 'blue',
					onClickBtn: () => openModal('edit'),
				}}
			>
				{isModalOpen && (
					<ModalPortal>
						<Modal onClose={closeModal}>
							{modalType === 'detail' && <DetailModal data={paginatedData[0]} />}
							{modalType === 'edit' && <EditModal data={paginatedData[0]} />}
						</Modal>
					</ModalPortal>
				)}
			</Table>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</>
	);
}
