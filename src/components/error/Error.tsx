import * as S from './Error.styles';

export function Error({ children }: { children: string }) {
	return <S.ErrorContainer>{children}</S.ErrorContainer>;
}
