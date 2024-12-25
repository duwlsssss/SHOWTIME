import * as S from './SearchEmployeeList.styles';
import React, { useCallback } from 'react';
import { TUser } from '@/types/auth';

interface AdminScheduleCardProps {
	employeeItem: TUser;
	onSetSearchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSetSearchUserId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchEmployeeList = React.memo(function SearchEmployeeList({
	employeeItem,
	onSetSearchListOpen,
	onSetSearchUserId,
}: AdminScheduleCardProps) {
	const handleItemClick = useCallback(
		(userId: string) => {
			onSetSearchUserId(userId);
			onSetSearchListOpen(false);
		},
		[onSetSearchUserId, onSetSearchListOpen],
	);

	return (
		<S.SearchContainer>
			<S.SearchWrapper>
				<S.SearchItem onClick={() => handleItemClick(employeeItem.id)}>
					<S.TextUserName>{employeeItem.userName}</S.TextUserName>
					<S.TextUserAlias>{employeeItem.userAlias}</S.TextUserAlias>
				</S.SearchItem>
			</S.SearchWrapper>
		</S.SearchContainer>
	);
});

export default SearchEmployeeList;
