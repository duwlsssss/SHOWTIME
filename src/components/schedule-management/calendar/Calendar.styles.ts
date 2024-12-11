import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TScheduleCategory } from '@/types/schedule';

export const CalenderContainer = styled.div`
	padding: var(--space-medium);
	border-radius: var(--medium-border-radius);
	box-shadow: var(--box-shadow-large);
	display: flex;
	justify-content: space-between;
	height: 100%;
`;

export const StyledCalendar = styled(Calendar)`
	font-family: 'Pretendard', sans-serif;
	width: 700px;
	border-radius: var(--medium-border-radius);
	border: 1px solid var(--color-pale-gray);
	/* 네비게이션 */
	.react-calendar__navigation {
		border-bottom: 1.5px solid var(--color-pale-gray);
		height: 60px;

		span {
			font-size: var(--font-large);
			font-weight: 700;
			color: var(--color-dark-gray);
		}
	}

	.react-calendar__navigation__arrow {
		font-size: var(--font-large);
		color: var(--color-regular-gray);
	}

	.react-calendar__navigation button:enabled:hover {
		background-color: var(--color-white);
		color: var(--color-blue);
		border-radius: var(--medium-border-radius);
	}
	.react-calendar__navigation button:enabled:focus {
		background-color: var(--color-white);
		border-radius: var(--medium-border-radius);
	}

	/* 월 뷰 */
	.react-calendar__month-view {
		margin-top: -7px;
		padding: 0 var(--space-xsmall) var(--space-xsmall) var(--space-xsmall);
		abbr {
			/* 텍스트 */
			color: var(--color-regular-gray);
			font-size: var(--font-small);
		}
	}

	/* 주 뷰 */
	.react-calendar__month-view__weekdays {
		padding-bottom: var(--space-small);
		abbr {
			font-size: var(--font-medium);
			font-weight: 700;
			text-decoration: none;
		}
		.react-calendar__month-view__weekdays__weekday--weekend {
			abbr {
				color: var(--color-coral);
			}
		}
	}

	/* 일 뷰 */
	.react-calendar__tile {
		text-align: center;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;

		/* 주말 일자 색 변경 */
		&.react-calendar__month-view__days__day {
			&.react-calendar__month-view__days__day--weekend {
				abbr {
					color: var(--color-coral);
				}
			}
		}
	}
	/* hover, focus, 선택됐을 시 */
	.react-calendar__tile:enabled:hover,
	.react-calendar__tile:enabled:focus,
	.react-calendar__tile--active,
	.react-calendar__tile--now:enabled:hover,
	.react-calendar__tile--now:enabled:focus {
		background-color: var(--color-pale-gray);
		border-radius: var(--small-border-radius);
	}

	.react-calendar__tile--now {
		background-color: var(--color-pale-gray-light);
		border-radius: var(--small-border-radius);
	}
`;

export const ScheduleBar = styled.div<{ $category: TScheduleCategory }>`
	width: 100%;
	padding: 0 var(--space-xsmall);
	margin: 3px 0 3px;
	text-align: center;
	background-color: ${({ $category }) =>
		$category === 'ticket'
			? 'var(--color-blue)'
			: $category === 'snack'
				? 'var(--color-caramel)'
				: 'var(--color-coral)'};
	color: var(--color-dark-gray);
	font-size: var(--font-small);
	border-radius: var(--medium-border-radius);
`;
