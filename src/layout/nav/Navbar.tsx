import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
	display: flex;
	gap: 20px;
	align-items: center;
	margin: 0 5px;
`;

function Navbar() {
	return (
		<NavContainer>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/profile">Profile</Link>
			<Link to="/salary-details">Salary Details</Link>
			<Link to="/correction-request">Correction Request</Link>
			<Link to="/calendar">Calendar</Link>
		</NavContainer>
	);
}

export default Navbar;
