import { SelectContainer, SelectBox } from './SalarySelect.style';

interface SelectBoxProps {
	value: string;
	value1: string;
	onChange: (value: string) => void;
	onChange1: (value1: string) => void;
}

export default function SalarySelect({ value, value1, onChange, onChange1 }: SelectBoxProps) {
	return (
		<SelectContainer>
			<SelectBox value={value} onChange={(e) => onChange(e.target.value)}>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
				<option value="2024">2024</option>
			</SelectBox>

			<SelectBox value={value1} onChange={(e) => onChange1(e.target.value)}>
				<option value="01">1월</option>
				<option value="02">2월</option>
				<option value="03">3월</option>
				<option value="04">4월</option>
				<option value="05">5월</option>
				<option value="06">6월</option>
				<option value="07">7월</option>
				<option value="08">8월</option>
				<option value="09">9월</option>
				<option value="10">10월</option>
				<option value="11">11월</option>
				<option value="12">12월</option>
			</SelectBox>
		</SelectContainer>
	);
}
