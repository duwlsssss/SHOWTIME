import { useState } from 'react';
import Table from '../table/table';
import Pagination from '../pagination/pagination';
import { ConfirmModal, Modal } from '@/components/modal/Modal';
import ModalPortal from '@/components/modal/ModalPortal';
import { Button } from '@/components';

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
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

const rowItems: RowItem[] = [
	{
		급여월: '2023-01-01',
		급여지급일: '2023-01-20',
		지급총액: '100만원',
		실지급액: '100만원',
	},
	{
		급여월: '2023-02-01',
		급여지급일: '2023-02-20',
		지급총액: '200만원',
		실지급액: '200만원',
	},
	{
		급여월: '2023-03-01',
		급여지급일: '2023-03-20',
		지급총액: '300만원',
		실지급액: '300만원',
	},
	{
		급여월: '2023-04-01',
		급여지급일: '2023-04-20',
		지급총액: '400만원',
		실지급액: '400만원',
	},
	{
		급여월: '2023-05-01',
		급여지급일: '2023-05-20',
		지급총액: '500만원',
		실지급액: '500만원',
	},
	{
		급여월: '2023-06-01',
		급여지급일: '2023-06-20',
		지급총액: '600만원',
		실지급액: '600만원',
	},
];
const headerItems: string[] = ['급여월', '급여지급일', '지급총액', '실지급액', '급여명세'];

const itemsPerPage = 5;

export default function PaginatedTable() {
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

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData: RowItem[] = rowItems.slice(startIndex, endIndex);

	const totalPages = Math.ceil(rowItems.length / itemsPerPage);

	return (
		<>
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
