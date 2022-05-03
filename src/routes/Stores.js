import React, {useEffect} from 'react';
import './../styles/Stores.scss';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import WithNavbarAndLoading from '../layout/WithNavbarAndLoading';
import { formatPrice } from '../services/utils/utils';
import { getLocalStorage } from '../services/utils/utils';
import { addStorageToState } from '../services/store/actions';
import { Box } from '@mui/material';

const createTableData = (items) => {
  let {storeList, totalPrice} = items.reduce((accumulators, curr, i) => {
    let {storeList, totalPrice} = accumulators;
    let index = storeList.findIndex(item => item.store === curr.store);
    if (index !== -1) {
      storeList[index] = {
        ...storeList[index], 
        quantity: storeList[index].quantity + 1,
        price: storeList[index].price + curr.price,
      }
    } else {
      storeList.push({
        store: curr.store,
        quantity: 1,
        price: curr.price,
        id: i
      });
    }
    totalPrice += curr.price;
    return {storeList, totalPrice};
  }, {storeList: [], totalPrice: 0})
  return {storeList, totalPrice};
}

const Stores = () => {
  const {items, rate, currency} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    let localStorageData = getLocalStorage();
    if (localStorageData.items) {
      dispatch(addStorageToState(localStorageData));
    }
    // eslint-disable-next-line
  }, []);  
  
  const columns = [
    { field: 'store', headerName: 'Store', flex:4 },
    { field: 'quantity', headerName: 'Quantity', flex:3 },
    { 
      field: 'price', 
      headerName: 'Price', 
      flex:3, 
      headerAlign: 'right', 
      align: 'right',
      renderCell: (params) => {
        return <span>{formatPrice(params.row.price, rate, currency)}</span>
      }
    },
  ];
  const {storeList, totalPrice} = createTableData(items);
  return <div className='page section-center'>
    <DataTable rows={storeList} columns={columns}/>
    <Box sx={{color: 'text.primary'}}>
      <div className="total-price">
        <h2>Total Price</h2>
        <h2>{formatPrice(totalPrice, rate, currency)}</h2>
      </div>
    </Box>
  </div>
}

export default WithNavbarAndLoading(Stores);