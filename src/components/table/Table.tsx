import { ManageRowItem } from '@/pages/salary-management/SalaryManagement';
import { TableContainer, Lists, InnerUnorderLists, InnerLists } from './Table.styled';
import { Button } from '@/components';
import { salaryFormatter } from '@/utils/salaryFormatter';

type TableProps = {
	data: RowItem[] | ManageRowItem[];
	headerItems: string[];
	btnContent: (row: RowItem | ManageRowItem) => BtnContent;
	children?: React.ReactNode;
	btnEdit?: BtnContent;
	condition?: React.ReactNode;
};

export interface RowItem {
	급여월?: string;
	급여지급일?: string;
	지급총액?: string;
	실지급액?: string;
}

export type BtnContent = {
	btnText: string;
	btnColor: string;
	onClickBtn: (row?: RowItem) => void;
};

export default function Table({
	data,
	headerItems,
	btnContent,
	btnEdit = { btnText: '', btnColor: '', onClickBtn: () => {} },
	condition,
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
								<InnerLists key={idx1}>
									{/* 지급총액과 실지급액에만 포맷팅 적용 */}
									{header === '지급총액' || header === '실지급액'
										? salaryFormatter(row[header as keyof RowItem] as string)
										: (row[header as keyof RowItem] ?? '')}
								</InnerLists>
							))}
							<InnerLists>
								<Button
									color={btnContent(row).btnColor}
									onClick={() => btnContent(row).onClickBtn(row)}
								>
									{btnContent(row).btnText}
								</Button>
								{children}
							</InnerLists>
							{headerItems.length > 5 && (
								<InnerLists>
									<Button
										color={btnContent(row).btnColor}
										onClick={btnEdit.onClickBtn}
										disabled={Number(condition) <= -14}
									>
										{btnEdit.btnText}
									</Button>
									{children}
								</InnerLists>
							)}
						</InnerUnorderLists>
					</Lists>
				))}
			</ul>
		</TableContainer>
	);
}
