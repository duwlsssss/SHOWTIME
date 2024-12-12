import styled from 'styled-components';
import type { ToggleButtonState, LeftSectionState, RightSectionState } from '@/types/main';

export const MainContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 100%;
	max-width: 95vw;
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
	flex: 0.1;
	border-radius: var(--small-border-radius);
	box-shadow: var(--box-shadow-large);
	transition: transform 0.3s ease;

	@media (max-width: 1165px) {
		position: absolute;
		left: 0;
		z-index: 5;
		transform: translateX(${(props) => (props.$isExpanded ? '0' : '-100%')});
		display: ${(props) => (props.$isExpanded ? 'block' : 'none')};
	}
	@media (max-height: 850px) {
		height: 600px;
	}
`;

export const MiddleSection = styled.div`
	flex: 0.5;

	@media (max-height: 850px) {
		height: 600px;
	}
`;

export const RightSection = styled.div<RightSectionState>`
	flex: 0.35;
	display: flex;
	flex-direction: column;
	gap: var(--space-medium);
	width: ${({ $isCollapsed }) => ($isCollapsed ? '400px' : '300px')};
	height: 100%;
	@media (max-width: 1165px) {
		display: ${(props) => (props.$isCollapsed ? 'none' : 'flex')};
		flex: 0.45;
	}

	@media (max-height: 850px) {
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
