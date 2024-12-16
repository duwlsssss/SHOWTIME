import * as S from './Toggle.styles';

interface ToggleProps {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

export const Toggle = ({ checked, onCheckedChange }: ToggleProps) => {
	return (
		<>
			<S.ToggleContainer onClick={() => onCheckedChange(!checked)}>
				<div className={`toggle-container ${checked ? 'toggle--checked' : ''}`} />
				<div className={`toggle-circle ${checked ? 'toggle--checked' : ''}`} />
			</S.ToggleContainer>
		</>
	);
};
