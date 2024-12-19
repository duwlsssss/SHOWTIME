import * as S from './Error.styles';
import { useErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components';

export function ErrorFallback({ error }: { error: Error }) {
	const { resetBoundary } = useErrorBoundary();

	return (
		<S.ErrorContainer>
			<S.ErrorText>에러가 발생했습니다</S.ErrorText>
			<S.ErrorDetailText>{error.message}</S.ErrorDetailText>
			<Button color="regular-gray" shape="line" onClick={resetBoundary}>
				다시 시도
			</Button>
		</S.ErrorContainer>
	);
}
