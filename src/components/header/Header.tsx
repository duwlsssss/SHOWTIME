import * as S from './Header.styles';
import { Navbar } from '@/components';

export function Header() {
	return (
		<S.HeaderContainer>
			<Navbar />
		</S.HeaderContainer>
	);
}
