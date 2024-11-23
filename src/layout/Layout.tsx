import Header from './header/Header';
import Footer from './nav/Footer';
import Sidebar from './nav/Sidebar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const MainSection = styled.div`
	display: flex;
	flex: 1;
	margin-top: 60px;
`;

const SidebarSection = styled.div`
	width: 240px;
	background-color: white;
	border-right: 1px solid #eee;
`;

const ContentArea = styled.div`
	flex: 1;
	background-color: #f5f5f5;
`;

function Layout() {
	return (
		<LayoutContainer>
			<Header />
			<MainSection>
				<SidebarSection>
					<Sidebar />
				</SidebarSection>
				<ContentArea>
					<Outlet />
				</ContentArea>
			</MainSection>
			<Footer />
		</LayoutContainer>
	);
}

export default Layout;
