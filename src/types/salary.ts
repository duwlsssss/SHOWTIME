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

export interface SalaryUserData extends RowItem {
	급여해: string;
}
