import React, { useEffect, useState } from 'react';
import useStyles from './use-styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/modal-reducer/modal-actions';
import { clearFilters, fetchProductSuccessAction, clearProductsErrorAction } from '../../../store/product-reducer/product-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';
import { useAppSelector } from '../../../types/hooks';
import { IProduct } from '../../../types/store-types';
import { DataType, HeadCells, OrderType, PropsTypeForTable } from '../../../types/types';
import ButtonComponent from '../../button';

function createData( { _id, title, price, category, manufacturer, quantity}: IProduct): DataType {
  const categories = category.join(", ");
  return { _id, title, price, categories , manufacturer, quantity};
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

const headCells: HeadCells = [
  { id: 'title', numeric: false, label: 'Название' },
  { id: 'price', numeric: true, label: 'Цена' },
  { id: 'categories', numeric: true, label: 'Категории' },
  { id: 'manufacturer', numeric: true, label: 'Производитель' },
  { id: 'quantity', numeric: true, label: 'Количество'},
  { id: 'edit', numeric: true, label: '', }
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


export default function ProductsPageForAdmin(): JSX.Element {

  const { allProducts, loading, errorProducts } = useAppSelector(state => state.products);

  const classes = useStyles();
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearFilters())
    return () => {dispatch(clearProductsErrorAction())}
  }, [dispatch]);

  const rows: DataType[] = allProducts.map(el => createData(el));

  const openNewProductForm = () => {
    dispatch(openModal("newProduct"));
  }

  const findCurrentProduct = (id: string): void => {
    const currentProduct = allProducts.find((el) => el._id === id);
    currentProduct && dispatch(fetchProductSuccessAction(currentProduct)); 
  }
  const handleDeleteItem = async (id: string): Promise<void> => {
    await findCurrentProduct(id);
    dispatch(openModal("deleteProduct"));
  }  

  const handleEditItem = async (id: string): Promise<void> => {
    await findCurrentProduct(id);
    dispatch(openModal("editProduct"));
  }

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

  if (errorProducts) return <ErrorIndicator errorText = {errorProducts} />

  return (
    <div className={classes.root}>
      <ButtonComponent className={classes.button} onClick={openNewProductForm} text="Создать товар" />
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.categories}</TableCell>
                      <TableCell align="right">{row.manufacturer}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right" className={classes.lastColumn}>
                        <IconButton aria-label="delete" onClick={() => handleDeleteItem(row._id.toString())}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => handleEditItem(row._id.toString())}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    
    </div>
  );
}