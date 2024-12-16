import React from 'react';
import {
	PayrollContainer,
	PayrollHeader,
	PayrollTable,
	PayrollSummary,
	PayrollDetails,
	PayrollTitle,
	TableData,
	TableHeader,
	SummaryItem,
	SummaryValue,
	SummaryLabel,
} from './detailModal.style';
export default function DetailModal({ data }) {
	return (
		<PayrollContainer>
			<PayrollTitle>급여 명세서</PayrollTitle>
			<PayrollHeader>
				<p>회사명: ShowTime</p>
				<p>직원: {data.이름}</p>
				<p>급여 월: {data.급여월} </p>
			</PayrollHeader>
			<PayrollDetails>
				<PayrollTable>
					<thead>
						<tr>
							<TableHeader>항목</TableHeader>
							<TableHeader>금액</TableHeader>
						</tr>
					</thead>
					<tbody>
						<tr>
							<TableData>기본 급여</TableData>
							<TableData>{data.지급총액} 원</TableData>
						</tr>
						{/* <tr>
							<TableData>보너스</TableData>
							<TableData>500,000 원</TableData>
						</tr> */}
						<tr>
							<TableData>세금 공제</TableData>
							<TableData>-{data.세금공제} 원</TableData>
						</tr>
						<tr>
							<TableData>보험 공제</TableData>
							<TableData>-{data.보험공제} 원</TableData>
						</tr>
					</tbody>
				</PayrollTable>
			</PayrollDetails>
			<PayrollSummary>
				<h2>합계</h2>
				<SummaryItem>
					<SummaryLabel>지급총액</SummaryLabel>
					<SummaryValue>{data.지급총액} 원</SummaryValue>
				</SummaryItem>
				<SummaryItem>
					<SummaryLabel>실수령액</SummaryLabel>
					<SummaryValue>{data.실지급액} 원</SummaryValue>
				</SummaryItem>
			</PayrollSummary>
		</PayrollContainer>
	);
}
