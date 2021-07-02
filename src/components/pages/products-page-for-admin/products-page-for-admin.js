import React, { useEffect, useState } from 'react';
import useStyles from './use-styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, IconButton, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/modal-reducer/modal-actions';
import { clearFilters, fetchProductSuccessAction, clearProductsErrorAction } from '../../../store/product-reducer/product-actions';
import Spinner from '../../spinner';
import ErrorIndicator from '../../error-indicator';

function createData( { _id, title, price, category, manufacturer, quantity, edit}) {
  const categories = category.join(", ")
  return { _id, title, price, categories , manufacturer, quantity, edit };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'title', numeric: false, label: 'Название' },
  { id: 'price', numeric: true, label: 'Цена' },
  { id: 'categories', numeric: true, label: 'Категории' },
  { id: 'manufacturer', numeric: true, label: 'Производитель' },
  { id: 'quantity', numeric: true, label: 'Количество'},
  { id: 'edit', numeric: true, label: '', }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
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


export default function ProductsPageForAdmin() {

  const { allProducts, loading, error } = useSelector(state => state.products);

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearFilters())
    return () => dispatch(clearProductsErrorAction())
  }, []);

  const rows = allProducts.map(el => createData(el));

  const openNewProductForm = () => {
    dispatch(openModal("newProduct"));
  }

  const findCurrentProduct = (id) => {
    const currentProduct = allProducts.find((el) => el._id === id);
    dispatch(fetchProductSuccessAction(currentProduct));
  }
  const handleDeleteItem = async (id) => {
    await findCurrentProduct(id);
    dispatch(openModal("deleteProduct"));
  }  

  const handleEditItem = async (id) => {
    await findCurrentProduct(id);
    dispatch(openModal("editProduct"));
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  if (loading) return <Spinner />

  if (error) return <ErrorIndicator />

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.button} onClick={openNewProductForm}>
        Создать товар
      </Button>
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
                        <IconButton aria-label="delete" onClick={() => handleDeleteItem(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => handleEditItem(row._id)}>
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