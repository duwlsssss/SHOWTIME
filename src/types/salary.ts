import { TMessage } from './modal';

export interface RowItem {
	id: number;
	이름: string;
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
	보험공제: string;
	세금공제: string;
}

export interface ManageRowItem {
	id: string;
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

export interface SalaryUserData extends RowItem {
	급여해: string;
}

export interface ModalConfig {
	message: TMessage;
	color: string;
	onClickLeftBtn: () => void;
	onClickRightBtn: () => void;
}

export interface AttendanceData {
	user_name: string;
	payment_month: string;
	payment_day: string;
	total_salary: number;
	id: string;
}

export interface RequestData {
	attendance: AttendanceData | AttendanceData[];
	created_at: string;
	status: string;
	id: string;
	requested_amount: number;
	reason: string;
	status_reason: string | null;
}
