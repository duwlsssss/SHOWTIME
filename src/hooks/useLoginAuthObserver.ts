import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { useAppDispatch } from './useRedux';
import { setUser, clearUser } from '@/redux/actions/userAction';
import { formatUserData } from '@/types/auth';

export const useLoginAuthObserver = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
				const additionalData = userDoc.data();

				const userData = formatUserData(currentUser, additionalData);
				dispatch(setUser(userData));
			} else {
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);
};
