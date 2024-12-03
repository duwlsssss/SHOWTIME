import * as S from './SalaryDetails.styles';
import PaginatedTable from '@/components/PaginatedTable/PaginatedTable';
import ButtonContainer from '@/components/salaryselect/salaryButton';

export function SalaryDetails() {
	return (
		<S.SalaryDetailsContainer>
			<ButtonContainer />
			<PaginatedTable />
		</S.SalaryDetailsContainer>
	);
}
