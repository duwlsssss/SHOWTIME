import { TableContainer, Lists, InnerUnorderLists, InnerLists } from './table.styled';

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
}

// 임시용 목데이터 fb연동이후 삭제
const headerItems: string[] = ['급여월', '급여지급일', '지급총액', '실지급액', '급여명세'];
const rowItems: RowItem[] = [
	{
		급여월: '2023-11-01',
		급여지급일: '2023-11-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
	{
		급여월: '2023-12-01',
		급여지급일: '2023-12-20',
		지급총액: '300만원',
		실지급액: '250만원',
	},
];

export default function Table() {
	return (
		<TableContainer>
			<TableUI />
		</TableContainer>
	);
}

function TableUI() {
	return (
		<ul>
			<Lists background="#f1f1f1">
				<InnerUnorderLists>
					{headerItems.map((cur, idx) => (
						<InnerLists key={idx}>{cur}</InnerLists>
					))}
				</InnerUnorderLists>
			</Lists>

			{rowItems.map((row, idx) => (
				<Lists key={idx}>
					<InnerUnorderLists>
						{headerItems.map((header, idx1) => (
							<InnerLists key={idx1}>{row[header as keyof RowItem] ?? ''}</InnerLists>
						))}
					</InnerUnorderLists>
				</Lists>
			))}
		</ul>
	);
}
