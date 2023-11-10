import { h, render, Component } from 'preact';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useEffect, useState } from 'preact/hooks';

// const StyledTable = styled(Table)`
//   width: calc(102% + 20px);
//   position: relative;
//   left: -20px;
// `;

// const StyledTh = styled(Th)`
//   background-color: #f6f9fc;
//   color: #8898aa;
//   text-align: left;
//   padding: 1rem 1rem;
//   font-size: ${({ theme }) => theme.fontSize.xs};
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   border-bottom: 1px solid #e9ecef;
//   border: 1px solid #f6f9fc;
//   &:first-child {
//     padding-left: 20px;
//   }
//   &:last-child {
//     padding-right: 20px;
//   }
// `;

// const StyledTd = styled(Td)`
//   padding: 1rem;
//   font-size: ${({ theme }) => theme.fontSize.xs};
//   &:first-child {
//     padding-left: 20px;
//   }
//   &:last-child {
//     padding-right: 20px;
//   }
// `;

// const StyledImage = styled.img`
//   max-width: 50px;
// `;

// const StyleProjectName = styled.div`
//   display: flex;
//   align-items: center;
// `;

const TableElement = ({ items, headers }) => {
  console.log(items, headers);
  return (
    <Table cellPadding="20" cellSpacing="0">
      <Thead>
        <Tr>
          {headers && headers.map((header) => <Th>{header}</Th>)}
        </Tr>
      </Thead>
      <Tbody>
        {items.length > 0 &&
          items.map((item) => (
            <Tr>
              <Td>
                {/* <StyleProjectName> */}
                <Image alt={item.name} src={item.imageLink} />
                <div>{item.name}</div>
                {/* </StyleProjectName> */}
              </Td>
              <Td>{item.budget}</Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default TableElement;