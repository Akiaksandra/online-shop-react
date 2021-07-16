import React, { useEffect, useState } from 'react';
import useStyles from '../products-page-for-admin/use-styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchAllUOrdersHistory } from '../../../store/users-reducer/users-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import { DataType, OrderType, PropsTypeForTable } from '../../../types/types';
import { useAppSelector } from '../../../types/hooks';
import { Order } from '../../../types/store-types';

function createData( { _id, forUser, orderPrice, orderStatus,  orderDileviryInfo : {deliveryType}} : Order): DataType {
  return { orderId: _id, userId: forUser, price: orderPrice, status: orderStatus, deliveryType };
}

function descendingComparator(a: DataType, b: DataType, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: OrderType, orderBy: string): (a: DataType, b: DataType) => number {
  return order === 'desc'
    ? (a: DataType, b: DataType) => descendingComparator(a, b, orderBy)
    : (a: DataType, b: DataType) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: DataType[], comparator: (a: DataType, b: DataType) => number) {
  const stabilizedThis: [DataType, number][] = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'orderId', numeric: false, label: 'ID заказа' },
  { id: 'userId', numeric: true, label: 'ID пользователя' },
  { id: 'price', numeric: true, label: 'Стоимость' },
  { id: 'status', numeric: true, label: 'Статус заказа' },
  { id: 'deliveryType', numeric: true, label: 'Вид доставки'},
];


function EnhancedTableHead(props: PropsTypeForTable): JSX.Element {

  const { classes, order, orderBy, onRequestSort } = props;
  
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default function OrdersHistoryForAdmin() {

  const { ordersHistory,  loading, errorUsers } = useAppSelector(state => state.users);

  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUOrdersHistory())
  }, [dispatch]);

  const rows = ordersHistory ? ordersHistory.map(el => createData(el)) : [];

  const handleRequestSort = (event: React.MouseEvent, property: string): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  if (loading) return <Spinner />

  if (errorUsers) return <ErrorIndicator errorText={errorUsers}/>

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              // @ts-ignore
              rowCount={rows.length}
            />
            <TableBody>
              {ordersHistory && stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={typeof row.orderId === "string" ?  row.orderId : null}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.orderId}
                      </TableCell>
                      <TableCell align="right">{row.userId}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.deliveryType}</TableCell>
                    </TableRow>

                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    
    </div>
  );
}