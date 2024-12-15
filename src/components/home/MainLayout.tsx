import { useState, useEffect } from 'react';
import * as S from './MainLayout.styles';
import { CheckboxGroup, CalendarComponent } from '@/components';
import { TOGGLE_BUTTON_TEXT } from '@/types/main';
import { useMainViewportWidth } from '@/hooks/useMainViewportWidth';
import MainDetailModal from '../PaginatedTable/DetailModal/MainDetailModal';

export function MainLayout() {
	const [isLeftSectionExpanded, setIsLeftSectionExpanded] = useState(true);
	const viewportWidth = useMainViewportWidth();
	const workPercentage = 75;

	useEffect(() => {
		if (viewportWidth <= 1165) {
			setIsLeftSectionExpanded(false);
		} else {
			setIsLeftSectionExpanded(true);
		}
	}, [viewportWidth]);

	return (
		<S.MainContainer>
			<S.ToggleButton
				onClick={() => setIsLeftSectionExpanded(!isLeftSectionExpanded)}
				$isVisible={!isLeftSectionExpanded}
			>
				{isLeftSectionExpanded ? TOGGLE_BUTTON_TEXT.COLLAPSE : TOGGLE_BUTTON_TEXT.EXPAND}
			</S.ToggleButton>

			<S.LeftSection $isExpanded={isLeftSectionExpanded}>
				<CheckboxGroup />
			</S.LeftSection>

			<S.MiddleSection>
				<CalendarComponent isManagementPage={false} />
			</S.MiddleSection>

			<S.RightSection $isCollapsed={isLeftSectionExpanded}>
				<S.WorkingHoursContainer>
					<S.WorkingHoursWrapper>
						<S.WorkingHoursInfo>
							<S.InfoLabel>이번 주 근무 시간</S.InfoLabel>
							<S.InfoValue>10시간 10분</S.InfoValue>
						</S.WorkingHoursInfo>
						<S.WorkingHoursInfo>
							<S.InfoLabel>이번 달 근무 시간</S.InfoLabel>
							<S.InfoValue>40시간 20분</S.InfoValue>
						</S.WorkingHoursInfo>
					</S.WorkingHoursWrapper>
					<S.ChartContainer>
						<S.WorkTimeChart $percentage={workPercentage}>
							<S.ChartCenter>{workPercentage}%</S.ChartCenter>
						</S.WorkTimeChart>
					</S.ChartContainer>
				</S.WorkingHoursContainer>

				<S.PayrollContainer>
					<MainDetailModal />
				</S.PayrollContainer>
			</S.RightSection>
		</S.MainContainer>
	);
}
