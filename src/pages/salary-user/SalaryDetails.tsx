import * as S from './SalaryDetails.styles';
import PaginatedTable from '@/components/PaginatedTable/PaginatedTable';

export function SalaryDetails() {
	return (
		<S.SalaryDetailsContainer>
			<PaginatedTable />
		</S.SalaryDetailsContainer>
	);
}
