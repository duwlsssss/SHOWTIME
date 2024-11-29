import styled from 'styled-components';
import { ToggleButtonState, LeftSectionState, RightSectionState } from '@/pages';

export const MainContainer = styled.main`
	min-height: 100vh;
	background-color: var(--color-pale-gray-light);
	padding: var(--space-medium);
`;

export const FlexContainer = styled.div`
	display: flex;
	gap: var(--space-medium);
	position: relative;
`;

export const ToggleButton = styled.button<ToggleButtonState>`
	display: none;
	position: absolute;
	left: var(--space-small);
	top: var(--space-small);
	z-index: 10;
	padding: var(--space-small);
	background: var(--color-white);
	border: none;
	border-radius: var(--small-border-radius);
	cursor: pointer;

	@media (max-width: 1165px) {
		display: block;
	}
`;

export const LeftSection = styled.div<LeftSectionState>`
	width: 256px;
	height: 810px;
	background-color: var(--color-white);
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	padding: var(--space-medium);
	transition: transform 0.3s ease;

	@media (max-width: 1165px) {
		position: absolute;
		left: 0;
		z-index: 5;
		transform: translateX(${(props) => (props.$isExpanded ? '0' : '-100%')});
		display: ${(props) => (props.$isExpanded ? 'block' : 'none')};
	}
`;

export const CategoryTitle = styled.h2`
	font-size: var(--font-medium);
	font-weight: bold;
	margin-bottom: var(--space-medium);
`;

export const CategoryList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: var(--space-small);
`;

export const CategoryItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--space-small);
`;

export const MiddleSection = styled.div`
	flex: 1;
	min-width: 500px;
	height: 810px;
	background-color: var(--color-white);
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	padding: var(--space-medium);
`;

export const RightSection = styled.div<RightSectionState>`
	width: 320px;
	height: 810px;
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);

	@media (max-width: 1165px) {
		display: ${(props) => (props.$isCollapsed ? 'none' : 'flex')};
	}
`;

export const WorkingHoursContainer = styled.div`
	background-color: var(--color-white);
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	padding: var(--space-xsmall) var(--space-medium);
	height: 190px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const WorkingHoursWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--space-small);
	justify-content: center;
`;

export const WorkingHoursInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--space-small);
`;

export const ChartContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const WorkTimeChart = styled.div<{ $percentage: number }>`
	position: relative;
	width: 80px;
	height: 80px;
	background: conic-gradient(
		#60a5fa 0% ${(props) => props.$percentage}%,
		#e5e7eb ${(props) => props.$percentage}% 100%
	);
	border-radius: 50%;

	&::after {
		content: '';
		position: absolute;
		top: 10%;
		left: 10%;
		right: 10%;
		bottom: 10%;
		background-color: white;
		border-radius: 50%;
	}
`;

export const ChartCenter = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	font-size: 24px;
	font-weight: bold;
`;

export const InfoLabel = styled.p`
	font-size: var(--font-small);
	color: var(--color-regular-gray);
`;

export const InfoValue = styled.p`
	font-size: var(--font-medium);
	font-weight: bold;
`;

export const PayrollContainer = styled.div`
	background-color: var(--color-white);
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	padding: var(--space-medium);
	flex: 1;
`;

export const PayrollTitle = styled.h3`
	font-size: var(--font-medium);
	font-weight: bold;
`;
