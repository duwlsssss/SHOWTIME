import { SelectContainer, SelectBox } from './salarySelect.style';

export default function SalarySelect() {
	return (
		<SelectContainer>
			<SelectBox>
				<option>2021</option>
				<option>2022</option>
				<option>2023</option>
				<option>2024</option>
			</SelectBox>

			<SelectBox>
				<option>1월</option>
				<option>2월</option>
				<option>3월</option>
				<option>4월</option>
			</SelectBox>
		</SelectContainer>
	);
}
