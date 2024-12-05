import { ModalBox, Info, TextArea, Label } from './editModal.style';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { Button } from '@/pages';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function EditModal({ data }) {
	const [updatedAmount, setUpdatedAmount] = useState('');
	const [reason, setReason] = useState('');

	//insert 함수
	const handleSubmit = async () => {
		if (!updatedAmount || !reason) {
			alert('정정신청급액과 신청사유를 모두 입력해주세요.');
			return;
		}

		try {
			const { error } = await supabase.from('attendance_request').insert([
				{
					attendance: data['id'],
					requested_amount: updatedAmount,
					reason: reason,
				},
			]);

			if (error) {
				console.error('Error inserting data:', error);
				alert('전송 실패했습니다..');
			} else {
				alert('전송 하였습니다!');
				setUpdatedAmount('');
				setReason('');
			}
		} catch (err) {
			console.error('Unexpected error:', err);
			alert('오류 났어요.');
		}
	};

	return (
		<ModalBox>
			<div style={{ margin: '20px' }}>
				<Info>
					<p>신청인: {data['이름']}</p>
					<p>급여월: {data['급여월']}</p>
					<p>급여지급일: {data['급여지급일']}</p>
				</Info>
				<Info>
					<p>기존금액: {data['실지급액']}</p>
					<p>
						정정신청급액:{' '}
						<input
							type="text"
							value={updatedAmount}
							onChange={(e) => setUpdatedAmount(e.target.value)}
						/>
					</p>
				</Info>
				<p style={{ justifySelf: 'flex-start' }}>신청사유</p>
				<TextArea
					placeholder="신청 사유를 입력하세요."
					value={reason}
					onChange={(e) => setReason(e.target.value)}
				/>
				<div>
					<Label htmlFor="file-upload">증거자료 첨부</Label>
					<input id="file-upload" type="file" style={{ display: 'none' }} />
				</div>
			</div>
			<Button color="blue" shape="line" onClick={handleSubmit}>
				제출하기
			</Button>
		</ModalBox>
	);
}
