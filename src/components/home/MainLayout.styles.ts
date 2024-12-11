import styled from 'styled-components';
import type { ToggleButtonState, LeftSectionState, RightSectionState } from '@/types/main';

export const MainContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

export const FlexContainer = styled.div`
	display: flex;
	height: 100%;
	gap: var(--space-medium);
	padding: var(--space-medium);
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
	/* width: 256px; */
	/* height: 810px; */
	/* background-color: var(--color-white); */
	/* border-radius: var(--small-border-radius); */
	/* box-shadow: var(--box-shadow-large); */
	/* flex-grow: 1; */
	/* padding: var(--space-medium); */
	transition: transform 0.3s ease;

	@media (max-width: 1165px) {
		position: absolute;
		left: 0;
		z-index: 5;
		transform: translateX(${(props) => (props.$isExpanded ? '0' : '-100%')});
		display: ${(props) => (props.$isExpanded ? 'block' : 'none')};
	}
	@media (max-height: 1200px) {
		height: 600px;
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
	flex-grow: 2;
	min-width: 500px;
	height: 810px;
	background-color: var(--color-white);
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	padding: var(--space-medium);
	justify-content: center;
	display: flex;

	@media (max-height: 1200px) {
		height: 600px;
	}
`;

export const RightSection = styled.div<RightSectionState>`
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);
	width: ${({ $isCollapsed }) => ($isCollapsed ? '400px' : '300px')};
	height: 100%;
	flex-grow: 0;
	@media (max-width: 1165px) {
		display: ${(props) => (props.$isCollapsed ? 'none' : 'flex')};
	}

	@media (max-height: 1200px) {
		height: 600px;
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
	@media (max-height: 1200px) {
		height: 120px;
	}
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
