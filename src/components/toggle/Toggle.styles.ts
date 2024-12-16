import styled from 'styled-components';

export const ToggleContainer = styled.div`
	position: relative;
	cursor: pointer;

	> .toggle-container {
		width: 50px;
		height: 24px;
		border-radius: 30px;
		background-color: rgb(233, 233, 234);
	}
	> .toggle--checked {
		background-color: var(--color-dark-gray);
		transition: 0.3s;
	}

	> .toggle-circle {
		position: absolute;
		top: 1px;
		left: 1px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: rgb(255, 254, 255);
		transition: 0.3s;
		//.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
	}
	> .toggle--checked {
		left: 27px;
		transition: 0.3s;
	}
`;
