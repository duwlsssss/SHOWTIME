import { TableContainer, Lists, InnerUnorderLists, InnerLists } from './table.styled';
import { Button } from '@/pages';

type TableProps = {
	data: RowItem[];
	headerItems: string[];
	btnContent?: BtnContent;
	children?: React.ReactNode;
};

interface RowItem {
	급여월: string;
	급여지급일: string;
	지급총액: string;
	실지급액: string;
}

type BtnContent = {
	btnText: string;
	btnColor: string;
	onClickBtn: () => void;
};

export default function Table({
	data,
	headerItems,
	btnContent = { btnText: '', btnColor: '', onClickBtn: () => {} },
	children,
}: TableProps) {
	return (
		<TableContainer>
			<ul>
				<Lists background="var(--color-skyblue)">
					<InnerUnorderLists>
						{headerItems.map((cur, idx) => (
							<InnerLists key={idx}>{cur}</InnerLists>
						))}
					</InnerUnorderLists>
				</Lists>

				{data.map((row, idx) => (
					<Lists key={idx}>
						<InnerUnorderLists>
							{headerItems.slice(0, 4).map((header, idx1) => (
								<InnerLists key={idx1}>{row[header as keyof RowItem] ?? ''}</InnerLists>
							))}
							<InnerLists>
								<Button color={btnContent.btnColor} onClick={btnContent.onClickBtn}>
									{btnContent.btnText}
								</Button>
								{children}
							</InnerLists>
						</InnerUnorderLists>
					</Lists>
				))}
			</ul>
		</TableContainer>
	);
}
