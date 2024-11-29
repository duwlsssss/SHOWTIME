import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div<{ $size?: number }>`
	position: absolute;
	top: 50%;
	left: 45%;
	transform: translate(-50%, -45%);

	--size: ${({ $size }) => $size ?? 48}px;
	--border-size: ${({ $size }) => ($size ?? 48) / 6}px;

	width: var(--size);
	height: var(--size);
	border: var(--border-size) solid var(--color-blue);
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: ${rotation} 1s linear infinite;
`;
