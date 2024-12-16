import * as S from './SearchEmployeeList.styles';
import { TSchedule } from '@/types/schedule';

interface AdminScheduleCardProps {
	schedulesItem: TSchedule;
	onSetSearchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSetSearchUserId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchEmployeeList = ({
	schedulesItem,
	onSetSearchListOpen,
	onSetSearchUserId,
}: AdminScheduleCardProps) => {
	const handleItemClick = (userId: string) => {
		onSetSearchUserId(userId);
		onSetSearchListOpen(false);
	};

	return (
		<S.SearchContainer>
			<S.SearchWrapper>
				<S.SearchItem onClick={() => handleItemClick(schedulesItem.user_id)}>
					<S.TextUserName>{schedulesItem.user_name}</S.TextUserName>
					<S.TextUserAlias>{schedulesItem.user_alias}</S.TextUserAlias>
				</S.SearchItem>
			</S.SearchWrapper>
		</S.SearchContainer>
	);
};

export default SearchEmployeeList;
