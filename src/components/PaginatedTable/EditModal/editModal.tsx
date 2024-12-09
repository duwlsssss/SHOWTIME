import { ModalBox, Info, TextArea, Label } from './editModal.style';
import { useState, useRef } from 'react';
import { Button } from '@/pages';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
interface EditModalProps {
	data: {
		id: string;
		이름: string;
		급여월: string;
		급여지급일: string;
		실지급액: string;
	};
}
export default function EditModal({ data }: EditModalProps) {
	const [updatedAmount, setUpdatedAmount] = useState('');
	const [reason, setReason] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	// 파일 선택 버튼 클릭 핸들러
	const handleFileButtonClick = () => {
		fileInputRef.current?.click();
	};
	// 파일 선택만 처리
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		setFile(selectedFile);
		console.log('파일 선택됨:', selectedFile.name);
	};
	// 파일 업로드 함수
	const uploadFile = async (fileToUpload: File): Promise<string> => {
		const fileExt = fileToUpload.name.split('.').pop();
		const fileName = `corrections/${Date.now()}.${fileExt}`;
		const { error: uploadError } = await supabase.storage
			.from('SalaryFile')
			.upload(fileName, fileToUpload);
		if (uploadError) throw uploadError;
		return `SalaryFile/${fileName}`;
	};
	// 제출 핸들러
	const handleSubmit = async () => {
		if (!file) {
			alert('파일을 선택해주세요');
			return;
		}
		if (!updatedAmount) {
			alert('정정신청급액을 입력해주세요');
			return;
		}
		if (!reason) {
			alert('신청사유를 입력해주세요');
			return;
		}
		setIsUploading(true);
		try {
			const filePath = await uploadFile(file);
			console.log('파일 업로드 완료:', filePath);

			const { error: dbError } = await supabase.from('attendance_request').insert([
				{
					attendance: data.id,
					requested_amount: updatedAmount,
					reason: reason,
					file_path: filePath,
					created_at: new Date().toISOString(),
				},
			]);
			if (dbError) throw dbError;
			alert('전송이 완료되었습니다!');
			return;
		} catch (error) {
			console.error('제출 실패:', error);
			alert('제출에 실패했습니다. 다시 시도해주세요.');
		} finally {
			setIsUploading(false);
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
					<Label onClick={handleFileButtonClick} style={{ cursor: 'pointer' }}>
						증거자료 첨부
					</Label>
					<input
						ref={fileInputRef}
						type="file"
						onChange={handleFileChange}
						style={{ display: 'none' }}
					/>
					{file && <span style={{ marginLeft: '10px' }}>선택된 파일: {file.name}</span>}
					{!file && <span style={{ marginLeft: '10px', color: '#666' }}>파일을 선택해주세요</span>}
				</div>
			</div>
			<Button color="blue" shape="line" onClick={handleSubmit} disabled={isUploading}>
				{isUploading ? '업로드 중...' : '제출하기'}
			</Button>
		</ModalBox>
	);
}
