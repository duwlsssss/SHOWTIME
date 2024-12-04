import { SalaryButton } from './salaryButton.styled';
import { Button } from '@/pages';

export default function ButtonContainer() {
	return (
		<SalaryButton>
			<Button color={'blue'} padding={'10px 20px'}>
				급여명세
			</Button>
			<Button color={'blue'} padding={'10px 20px'}>
				정정신청
			</Button>
		</SalaryButton>
	);
}
