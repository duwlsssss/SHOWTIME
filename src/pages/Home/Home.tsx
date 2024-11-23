import { useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import styled from 'styled-components';

const HomePage = styled.div.attrs({ className: 'page-content' })``;

function Home() {
	useEffect(() => {
		const testFirebaseConnection = async () => {
			try {
				await setDoc(doc(db, 'testCollection', 'testDoc'), {
					testField: 'Hello, Firebase!',
				});
				console.log('Firebase connection successful!');
			} catch (error) {
				console.error('Error connecting to Firebase:', error);
			}
		};

		testFirebaseConnection();
	}, []);

	return (
		<HomePage>
			<h2>Home Page</h2>
			{/* 홈 페이지 내용 */}
		</HomePage>
	);
}

export default Home;
