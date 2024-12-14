import styled from 'styled-components';

export const PayrollContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const PayrollHeader = styled.header`
	text-align: center;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
`;

export const PayrollTitle = styled.h1`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 30px;
	text-align: center;
`;

export const PayrollDetails = styled.section`
	margin-bottom: 30px;
`;

export const PayrollTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
`;

export const TableHeader = styled.th`
	padding: 10px;
	text-align: left;
	border-bottom: 1px solid #ddd;
`;

export const TableData = styled.td`
	padding: 10px;
	text-align: left;
	border-bottom: 1px solid #ddd;
`;

export const PayrollSummary = styled.section`
	background-color: #e9f5fe;
	padding: 15px;
	border-radius: 5px;
`;

export const SummaryItem = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	padding: 5px 0;
`;

export const SummaryLabel = styled.span`
	font-weight: bold;
	color: #333;
`;

export const SummaryValue = styled.span`
	color: #2d9cdb;
`;
