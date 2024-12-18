import * as S from './ScheduleAddButton.styles';

export const ScheduleAddButton = ({
	className,
	onClick,
	disabled,
}: {
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}) => {
	return (
		<S.ScheduleAddButton
			className={className}
			onClick={onClick}
			disabled={disabled}
			color="blue"
			shape="block"
			padding="none"
		>
			+
		</S.ScheduleAddButton>
	);
};
