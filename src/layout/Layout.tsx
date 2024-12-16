import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';
import * as S from './Layout.styles';

function Layout() {
	return (
		<S.LayoutContainer>
			<Header />
			<S.MainSection>
				<S.ContentArea>
					<Outlet />
				</S.ContentArea>
			</S.MainSection>
			<Footer />
		</S.LayoutContainer>
	);
}

export default Layout;
