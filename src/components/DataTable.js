import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import './../styles/DataTable.scss'

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell': {
            outline: 'none'
        },
    }
});

const customNoRowsText = () => {
  return (
    <div className='no-rows-text'>
      <span >No items to display</span>
    </div>
  )
}

const DataTable = ({rows, columns, sortModel=null}) => {
  
  const classes = useStyles();

  return (
    <div className='table'>
      <DataGrid
      className={classes.root}
      sx={columns.length > 3 ? {minWidth: '800px'} : null}
      components={{NoRowsOverlay: customNoRowsText}}
        disableSelectionOnClick
        rows={rows}
        initialState={{
          sorting: {
            sortModel: sortModel
          },
        }}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DataTable;
