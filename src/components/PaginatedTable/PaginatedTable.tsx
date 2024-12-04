import { useState, useEffect } from 'react';
import Table from '../table/table';
import Pagination from '../pagination/pagination';
import { ConfirmModal, Modal } from '@/components/modal/Modal';
import SalarySelect from '@/components/salaryselect/salarySelect';
import ModalPortal from '@/components/modal/ModalPortal';
import { Button } from '@/components';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
	id: string;
}

type Message = {
	confirm: string;
	leftBtn: string;
	rightBtn: string;
};

// type BtnContent = {
// 	btnText: string;
// 	btnColor: string;
// 	onClickBtn: () => void;
// };

const headerItems: string[] = ['급여월', '급여지급일', '지급총액', '실지급액', '급여명세'];

const itemsPerPage = 5;

export default function PaginatedTable() {
	//모달창 변수들
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const openConfirmModal = () => setIsConfirmModalOpen(true);
	const closeConfirmModal = () => setIsConfirmModalOpen(false);

	const message: Message = {
		confirm: '급여 정정을 승인하시겠습니까?',
		leftBtn: '네',
		rightBtn: '아니오',
	};

	//데이터 상태
	const [rowItems, setRowItems] = useState<RowItem[]>([]);
	const [selectedYear, setSelectedYear] = useState<string>('2024');
	const [selectedMonth, setSelectedMonth] = useState<string>('01');
	const [filteredItems, setFilteredItems] = useState<RowItem[]>([]);

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData: RowItem[] = filteredItems.slice(startIndex, endIndex);

	const totalPages = Math.ceil(rowItems.length / itemsPerPage);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'attendance')); // 'attendance' 컬렉션 가져오기
				const fetchedData = querySnapshot.docs.map((doc) => ({
					id: doc.id, // 문서 ID 추가
					...doc.data(), // 문서 데이터 추가
				}));
				setRowItems(fetchedData as RowItem[]); // 상태에 데이터 설정
			} catch (error) {
				console.error('Firestore 데이터를 가져오는 중 오류 발생:', error);
			}
		};

		fetchData();
	}, []);

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
					onClickBtn: openModal,
				}}
			>
				{isModalOpen && (
					<ModalPortal>
						<Modal onClose={closeModal}>
							{/* 모달 내용 */}
							모달 내용
							<Button color="blue" shape="line" onClick={openConfirmModal}>
								처리하기
							</Button>
							{isConfirmModalOpen && (
								<ModalPortal>
									<ConfirmModal
										onClose={closeConfirmModal}
										message={message}
										color={'blue'}
										onClickLeftBtn={test1}
										onClickRightBtn={test1}
									/>
								</ModalPortal>
							)}
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

const test1 = () => {
	console.log('test');
};
