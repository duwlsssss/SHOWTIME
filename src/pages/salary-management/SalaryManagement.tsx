import { Button } from '@/components';
import * as S from './SalaryManagement.styles';
import { useEffect, useState } from 'react';
import { ConfirmModal, Modal, ModalPortal } from '@/components';
import Table, { RowItem } from '@/components/table/Table';
import Pagination from '@/components/pagination/pagination';
import SalarySelect from '@/components/salaryselect/SalarySelect';
import { createClient } from '@supabase/supabase-js';
import { TMessage } from '@/types/modal';
import { useAppSelector } from '@/hooks/useRedux';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface ManageRowItem extends RowItem {
	신청인: string;
	급여월: string;
	급여지급일: string;
	지급예정금액: number;
	상태: string;
	정정신청금액: number;
	사유: string;
	처리사유: string | null;
	신청id: string;
}

interface ModalConfig {
	message: TMessage;
	color: string;
	onClickLeftBtn: () => void;
	onClickRightBtn: () => void;
}

interface AttendanceData {
	user_name: string;
	payment_month: string;
	payment_day: string;
	total_salary: number;
	id: string;
}

interface RequestData {
	attendance: AttendanceData | AttendanceData[];
	created_at: string;
	status: string;
	id: string;
	requested_amount: number;
	reason: string;
	status_reason: string | null;
}

export function SalaryManagement() {
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
						onClickBtn: () => console.log(`상태 확인 필요`),
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

	const updateAttendanceRuest = async (status) => {
		if (!formData.requestId || !formData.selectOption) {
			alert('필수 항목이 비어있습니다.');
			return;
		}

		try {
			if (status === '승인') {
				// attendance의 total_salary 변경
				const { error: attendanceError } = await supabase
					.from('attendance')
					.update({
						total_salary: formData.requestSalary,
					})
					.eq('id', `${formData.attendanceId}`);

				if (attendanceError) {
					console.error('Error updating Attendance data: ', attendanceError);
				}
			}

			// attendance_request의 상태 변경
			const { error: requestError } = await supabase
				.from('attendance_request')
				.update({
					status: formData.selectOption,
					status_reason: formData.statusReason,
					updated_at: new Date().toISOString(),
				})
				.eq('id', `${formData.requestId}`);

			if (requestError) {
				console.error('Error updating Request data:', requestError);
			}
		} catch (error) {
			console.error('Error occured: ', error);
			alert('처리 반영에 오류가 발생했습니다');
		}

		alert('처리가 완료되었습니다.');
		location.reload();
	};

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

	// selectOption에 맞는 Modal 설정을 반환하는 함수
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
					onClickLeftBtn: () => updateAttendanceRuest('승인'),
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
					onClickLeftBtn: () => updateAttendanceRuest('반려'),
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

	const headerItems: string[] = ['신청인', '급여월', '급여지급일', '지급예정금액', '상태'];
	const [attendanceRequestData, setAttendanceRequestData] = useState<ManageRowItem[]>([]);

	const year = useAppSelector((state) => state.schedule.year);
	const month = useAppSelector((state) => state.schedule.month);
	const now = new Date();

	const [selectedYear, setSelectedYear] = useState<string>(
		year.toString() || now.getFullYear().toString(),
	);
	const [selectedMonth, setSelectedMonth] = useState<string>(
		month.toString() || now.getMonth().toString().padStart(2, '0'),
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

	//페이지네이션 변수들
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	useEffect(() => {
		const pageSize = 5;

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		let totalCount = 0;

		const getAttendanceRuestCount = async () => {
			const { count, error: countError } = await supabase
				.from('attendance_request')
				.select(
					`
					id,
					attendance!inner (
						payment_month
					)
				`,
					{ count: 'exact' },
				)
				.like('attendance.payment_month', `${selectedYear}-${selectedMonth}%`);
			if (countError) {
				console.error('Error fetching total count:', countError);
			} else {
				totalCount = count || 0;
			}
			setTotalPage(Math.ceil(totalCount / pageSize));
		};

		const fetchAttendanceRequestData = async () => {
			const { data, error } = await supabase
				.from('attendance_request')
				.select(
					`
					created_at,
					status,
					id,
					requested_amount,
					reason,
					status_reason,
					attendance!inner (
						user_name,
						payment_month,
						payment_day,
						total_salary,
						id
					)
				`,
				)
				.like('attendance.payment_month', `${selectedYear}-${selectedMonth}%`)
				.order('created_at', { ascending: false })
				.range(startIndex, endIndex - 1);
			if (error) {
				console.error('Error fetching data:', error);
			} else {
				console.log(data);
				const reorderedData: ManageRowItem[] = data.map((item: RequestData) => {
					const attendance = Array.isArray(item.attendance) ? item.attendance[0] : item.attendance;
					return {
						신청인: attendance?.user_name,
						급여월: attendance?.payment_month,
						급여지급일: attendance?.payment_day,
						지급예정금액: attendance?.total_salary,
						id: attendance?.id,
						상태: item.status,
						사유: item.reason,
						정정신청금액: item.requested_amount,
						처리사유: item.status_reason,
						신청id: item.id,
					};
				});
				setAttendanceRequestData(reorderedData);
			}
		};
		getAttendanceRuestCount();
		fetchAttendanceRequestData();
	}, [selectedYear, selectedMonth, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedYear, selectedMonth]);

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
											<S.Data>{selectedRow.지급예정금액}</S.Data>
										</S.DataSet>
										<S.DataSet>
											<S.Label>정정신청반영금액</S.Label>
											<S.Data>{selectedRow.정정신청금액}</S.Data>
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
