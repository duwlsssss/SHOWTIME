import * as S from './Loader.styles';
import { useState, useEffect } from 'react';

const Loader = ({ size = 48 }: { size?: number }) => {
	return <S.LoadingContainer $size={size} />;
};

export const DeferredLoader = () => {
	const [isDeferred, setIsDeferred] = useState(false);

	useEffect(() => {
		const id = setTimeout(() => {
			setIsDeferred(true);
		}, 200);
		return () => clearTimeout(id);
	}, []);

	if (!isDeferred) {
		return null;
	}

	return <Loader />;
};
