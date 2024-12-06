export interface TModalState {
	isModalOpen: boolean;
	isConfirmModalOpen: boolean;
	isScheduleAddModalOpen: boolean;
	isScheduleEditModalOpen: boolean;
	isScheduleDeleteModalOpen: boolean;
}

// 색상 데이터 상수
export const COLORS: Record<string, { dark: string; normal: string }> = {
	red: { dark: 'coral-dark', normal: 'coral' },
	blue: { dark: 'blue', normal: 'skyblue' },
	green: { dark: 'green-dark', normal: 'green' },
} as const;

// 유니언 타입으로 컬러 키를 정의
export type TColorType = keyof typeof COLORS;

export type TMessage = {
	confirm: string;
	leftBtn: string;
	rightBtn: string;
};

export interface TModalProps {
	onClose: () => void;
	children?: React.ReactNode;
}

export interface TConfirmModalProps {
	onClose: () => void;
	message: TMessage;
	color?: TColorType;
	onClickLeftBtn: () => void;
	onClickRightBtn: () => void;
}
