import { TABLE_COLUMNS } from "src/pages/transactions/constants";
import {
  HeaderCell,
  TableHead,
} from "src/pages/transactions/TransactionsTableHeader.styled";

export const TransactionsTableHeader = () => {
  return (
    <TableHead>
      <tr>
        {TABLE_COLUMNS.map(({ label, align, width }) => (
          <HeaderCell key={label} scope="col" $align={align} $width={width}>
            {label}
          </HeaderCell>
        ))}
      </tr>
    </TableHead>
  );
};
