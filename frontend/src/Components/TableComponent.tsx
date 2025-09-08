
import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  margin-top: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  background-color: #fff;
`;

 export const TableHeader = styled.thead`
  background-color: #f59e0b;
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px; 
  color: white;
  text-align: center;
  font-size: 16px;
`;

 export  const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fbf9f6;
  }

  &:hover {
    background-color: #f6e9d2;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  text-align: center;
`;

