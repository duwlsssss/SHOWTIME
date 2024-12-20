import { Button } from '@/components';
import * as S from './SalaryManagement.styles';
import { useEffect, useState } from 'react';
import { ConfirmModal, Modal, ModalPortal } from '@/components';
import Table, { RowItem } from '@/components/table/Table';
import Pagination from '@/components/pagination/pagination';
import SalarySelect from '@/components/salaryselect/SalarySelect';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setMonth, setYear } from '@/redux/actions/scheduleActions';
import { salaryFormatter } from '@/utils/salaryFormatter';
import { ManageRowItem, ModalConfig } from '@/types/salary';
import { updateAttendanceRuest, useAttendanceRequestData } from '@/hooks/useSalaryManageData';

export function SalaryManagement() {
	const headerItems: string[] = ['신청인', '급여월', '급여지급일', '지급예정금액', '상태'];

	const year = useAppSelector((state) => state.schedule.year);
	const month = useAppSelector((state) => state.schedule.month);
	const now = new Date();

	const [selectedYear, setSelectedYear] = useState<string>(
		year.toString() || now.getFullYear().toString(),
	);

	const [selectedMonth, setSelectedMonth] = useState<string>(
		month.toString().padStart(2, '0') || now.getMonth().toString().padStart(2, '0'),
	);

	const handleSelectChange = (event) => {
		setFormData({
			...formData,
			selectOption: event.target.value,
		});
	};

	const handleStatusReasonChange = (event) => {
		setFormData({
			...formData,
			statusReason: event.target.value,
		});
	};

	const {
		currentPage,
		setCurrentPage,
		totalPage,
		attendanceRequestData,
		handlePageChange,
		getAttendanceRequestData,
	} = useAttendanceRequestData();

	useEffect(() => {
		getAttendanceRequestData(selectedYear, selectedMonth);
	}, [selectedYear, selectedMonth, currentPage]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setCurrentPage(1);
		dispatch(setYear(Number(selectedYear)));
		dispatch(setMonth(Number(selectedMonth)));
	}, [selectedYear, selectedMonth]);

	const getBtnContent = (row: RowItem | ManageRowItem) => {
		if ('상태' in row) {
			switch (row.상태) {
				case '대기중':
					return {
						btnText: '대기중',
						btnColor: 'green',
						onClickBtn: (row) => openModal(row),
					};
				case '승인':
					return {
						btnText: '승인',
						btnColor: 'blue',
						onClickBtn: (row) => openModal(row),
					};
				case '반려':
					return {
						btnText: '반려',
						btnColor: 'coral-dark',
						onClickBtn: (row) => openModal(row),
					};
				default:
					return {
						btnText: '알 수 없음',
						btnColor: 'gray',
						onClickBtn: () => {},
					};
			}
		} else {
			return {
				btnText: '알 수 없음',
				btnColor: 'gray',
				onClickBtn: () => console.log(`상태 확인 필요`),
			};
		}
	};

	/* 정정신청 상세보기 모달 */

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<ManageRowItem | null>(null);

	const openModal = (row) => {
		setSelectedRow(row);
		setFormData({
			...formData,
			requestId: row.신청id,
			attendanceId: row.id,
			requestSalary: row.정정신청금액,
		});
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedRow(null);
		setFormData({
			statusReason: '',
			selectOption: '승인',
			requestId: '',
			attendanceId: '',
			requestSalary: 0,
		});
		setIsModalOpen(false);
	};

	const [formData, setFormData] = useState({
		statusReason: '',
		selectOption: '승인',
		requestId: '',
		attendanceId: '',
		requestSalary: 0,
	});

	/* 정정신청 처리 확인 모달 */

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [modalConfig, setModalConfig] = useState({
		message: { confirm: '', leftBtn: '', rightBtn: '' },
		color: '',
		onClickLeftBtn: () => console.log('왼쪽 버튼'),
		onClickRightBtn: () => console.log('오른쪽 버튼'),
	});

	const isValidInput = () => {
		return formData.selectOption !== '' && formData.statusReason !== '';
	};

	useEffect(() => {
		if (formData.selectOption) {
			const config = getModalConfig(formData.selectOption);
			setModalConfig(config);
		}
	}, [formData]);

	// selectOption에 맞는 confirmModal 설정을 반환하는 함수
	const getModalConfig = (selectOption: string): ModalConfig => {
		switch (selectOption) {
			case '승인':
				return {
					message: {
						confirm: '승인하시겠습니까?',
						leftBtn: '네',
						rightBtn: '아니오',
					},
					color: 'blue',
					onClickLeftBtn: () => updateAttendanceRuest(formData, '승인'),
					onClickRightBtn: () => closeConfirmModal(),
				};
			case '반려':
				return {
					message: {
						confirm: '반려하시겠습니까?',
						leftBtn: '네',
						rightBtn: '아니오',
					},
					color: 'red',
					onClickLeftBtn: () => updateAttendanceRuest(formData, '반려'),
					onClickRightBtn: () => closeConfirmModal(),
				};
			default:
				return {
					message: { confirm: '', leftBtn: '', rightBtn: '' },
					color: '',
					onClickLeftBtn: () => {},
					onClickRightBtn: () => {},
				};
		}
	};

	const openConfirmModal = () => {
		if (isValidInput()) {
			setIsConfirmModalOpen(true);
		} else {
			alert('처리 사유와 선택 항목을 입력해주세요.');
		}
	};

	const closeConfirmModal = () => setIsConfirmModalOpen(false);

	return (
		<S.SalaryManagementContainer>
			<SalarySelect
				value={selectedYear}
				value1={selectedMonth}
				onChange={(value) => {
					setSelectedYear(value);
				}}
				onChange1={(value1) => {
					setSelectedMonth(value1);
				}}
			/>
			<Table data={attendanceRequestData} headerItems={headerItems} btnContent={getBtnContent}>
				{isModalOpen && selectedRow && (
					<ModalPortal>
						<Modal onClose={closeModal}>
							<S.ModalComponent>
								<S.Info>
									<S.Row>
										<S.DataSet>
											<S.Label>신청인</S.Label>
											<S.Data>{selectedRow.신청인}</S.Data>
										</S.DataSet>
										<S.DataSet>
											<S.Label>급여월</S.Label>
											<S.Data>{selectedRow.급여월}</S.Data>
										</S.DataSet>
										<S.DataSet>
											<S.Label>급여지급일</S.Label>
											<S.Data>{selectedRow.급여지급일}</S.Data>
										</S.DataSet>
									</S.Row>
									<S.Row>
										<S.DataSet>
											<S.Label>기존지급예정금액</S.Label>
											<S.Data>{salaryFormatter(selectedRow.지급예정금액.toString())} 원</S.Data>
										</S.DataSet>
										<S.DataSet>
											<S.Label>정정신청금액</S.Label>
											<S.Data>{salaryFormatter(selectedRow.정정신청금액.toString())} 원</S.Data>
										</S.DataSet>
									</S.Row>
									<S.Row>
										<S.DataSet>
											<S.Label>신청사유</S.Label>
											<S.Data>{selectedRow.사유}</S.Data>
										</S.DataSet>
									</S.Row>
								</S.Info>

								<S.Form>
									<S.Row>
										<S.DataSet>
											<S.Label>상태</S.Label>
											<S.Select
												name="selectOption"
												value={formData.selectOption}
												disabled={selectedRow.상태 !== '대기중'}
												onChange={handleSelectChange}
											>
												<option value="승인">승인</option>
												<option value="반려">반려</option>
											</S.Select>
										</S.DataSet>
									</S.Row>
									<S.Row>
										<S.DataSet>
											<S.Label>사유</S.Label>
											<S.Input
												id="statusReason"
												name="statusReason"
												type="text"
												placeholder="처리 사유를 입력하세요."
												value={
													selectedRow.상태 === '대기중'
														? formData.statusReason
														: selectedRow.처리사유 || ''
												}
												disabled={selectedRow.상태 !== '대기중'}
												onChange={handleStatusReasonChange}
											/>
										</S.DataSet>
									</S.Row>
								</S.Form>
							</S.ModalComponent>
							{selectedRow.상태 === '대기중' && (
								<Button color="blue" shape="line" onClick={openConfirmModal}>
									처리하기
								</Button>
							)}
							{selectedRow.상태 !== '대기중' && (
								<Button color="dark-gray" shape="fill" onClick={() => {}}>
									처리완료
								</Button>
							)}
							{isConfirmModalOpen && (
								<ModalPortal>
									<ConfirmModal
										onClose={closeConfirmModal}
										message={modalConfig.message}
										color={modalConfig.color}
										onClickLeftBtn={modalConfig.onClickLeftBtn}
										onClickRightBtn={modalConfig.onClickRightBtn}
									/>
								</ModalPortal>
							)}
						</Modal>
					</ModalPortal>
				)}
			</Table>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPage}
				onPageChange={handlePageChange}
			/>
		</S.SalaryManagementContainer>
	);
}
