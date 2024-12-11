import * as S from './SearchEmplyeeList.style';
import {
	TDate,
	TScheduleCategory,
	TScheduleRepeatCycle,
	TScheduleShiftType,
} from '@/types/schedule';

interface AdminScheduleCardProps {
	schedulesItem: {
		schedule_id: string;
		user_id?: string;
		user_name: string;
		user_alias: string;
		category: TScheduleCategory;
		start_date_time: TDate;
		time: string;
		end_date_time: TDate; // 계산된 종료 시간
		schedule_shift_type: TScheduleShiftType; // 계산된 오픈, 미들, 마감
		repeat?: TScheduleRepeatCycle;
		repeat_end_date?: TDate;
		created_at: TDate;
		description?: string;
	};
	onSetSearchListOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSetSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchEmplyeeList = ({
	schedulesItem,
	onSetSearchListOpen,
	onSetSearchTerm,
}: AdminScheduleCardProps) => {
	const handleItemClick = (name: string) => {
		onSetSearchListOpen(true);
		onSetSearchTerm(name);
	};

	return (
		<S.SearchContainer>
			<S.SearchWrapper>
				<S.SearchItem
					onClick={() => handleItemClick(schedulesItem.user_name)}
					id={schedulesItem.user_id}
				>
					{schedulesItem.user_name}
				</S.SearchItem>
			</S.SearchWrapper>
		</S.SearchContainer>
	);
};

export default SearchEmplyeeList;
