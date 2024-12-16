import * as S from './Loading.styles';

export function Loading({ size = 48 }: { size?: number }) {
	return <S.LoadingContainer $size={size} />;
}
