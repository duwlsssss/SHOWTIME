import * as S from './Header.styles';
import { Navbar } from '../nav/Navbar';

export function Header() {
	return (
		<S.HeaderContainer>
			<Navbar />
		</S.HeaderContainer>
	);
}
