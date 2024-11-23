import styled from 'styled-components';
import Navbar from '../nav/Navbar';

const HeaderContainer = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 60px;
	background-color: white;
	box-shadow: none;
	z-index: 1000;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 20px;
	border-bottom: 1px solid #e0e0e0;
`;

function Header() {
	return (
		<HeaderContainer>
			<Navbar />
		</HeaderContainer>
	);
}

export default Header;
