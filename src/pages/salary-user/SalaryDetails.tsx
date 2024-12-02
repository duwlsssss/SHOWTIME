import * as S from './SalaryDetails.styles';
import PaginatedTable from '@/components/PaginatedTable/PaginatedTable';
import SalarySelect from '@/components/salaryselect/salarySelect';
import ButtonContainer from '@/components/salaryselect/salaryButton';

export function SalaryDetails() {
	return (
		<S.SalaryDetailsContainer>
			<ButtonContainer />
			<SalarySelect />
			<PaginatedTable />
		</S.SalaryDetailsContainer>
	);
}
