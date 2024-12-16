import { useState, useEffect } from 'react';
import * as S from './MainLayout.styles';
import { CheckboxGroup, CalendarComponent } from '@/components';
import { TOGGLE_BUTTON_TEXT } from '@/types/main';
import { useMainViewportWidth } from '@/hooks/useMainViewportWidth';
import { useAppSelector } from '@/hooks/useRedux';
import { WorkingHours } from './WorkingHours';

import MainDetailModal from '../PaginatedTable/DetailModal/MainDetailModal';

import { SalaryManage } from './SalaryManage';

export function MainLayout() {
	const user = useAppSelector((state) => state.user);
	const isAuthInitialized = useAppSelector((state) => state.user.isAuthInitialized);

	// user 정보가 초기화되지 않았다면 로딩 표시
	if (!isAuthInitialized) {
		return <div>Loading...</div>;
	}

	const [isLeftSectionExpanded, setIsLeftSectionExpanded] = useState(true);
	const viewportWidth = useMainViewportWidth();

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
				<WorkingHours />

				<S.PayrollContainer>
					<S.PayrollTitle>급여 명세서</S.PayrollTitle>
					{isAuthInitialized && user?.user?.role === 'admin' ? (
						<>
							<SalaryManage />
						</>
					) : isAuthInitialized && user?.user?.role === 'user' ? (
						<S.PayrollMargin>
							<MainDetailModal />
						</S.PayrollMargin>
					) : null}
				</S.PayrollContainer>
			</S.RightSection>
		</S.MainContainer>
	);
}
