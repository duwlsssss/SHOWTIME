import * as S from './ScheduleAddButton.styles';

export const ScheduleAddButton = ({
	className,
	onClick,
}: {
	className: string;
	onClick: () => void;
}) => {
	return (
		<S.ScheduleAddButton
			className={className}
			onClick={onClick}
			color="blue"
			shape="block"
			padding="none"
		>
			+
		</S.ScheduleAddButton>
	);
};
