import React, { useEffect, useState } from 'react'
import './../styles/Home.scss'
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import WithNavbarAndLoading from '../layout/WithNavbarAndLoading'
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../services/utils/utils';
import { getLocalStorage } from '../services/utils/utils';
import { toggleDelivery, addStorageToState, deleteItem } from '../services/store/actions';
import * as moment from 'moment';
import { Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useMediaQueryHook from '../services/Hooks/UseMediaQueryHook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
    button: {
        textTransform: "none"
    }
});

const Home = () => {
    const {items, rate, currency} = useSelector(state => state);
    const itemsInDelivery = useSelector(state => state.items.filter((item) => item.inDelivery));
    const arrivedItems = useSelector(state => state.items.filter((item) => !item.inDelivery));
    const dispatch = useDispatch();
    
    const [tab, setTab] = useState('delivery');
    const [isEditing, setIsEditing] = useState(false);
    const [itemData, setItemData] = useState({})
    const {responsiveBtns} = useMediaQueryHook();
    
    useEffect(() => {
        let localStorageData = getLocalStorage();
        if (localStorageData.items) {
            dispatch(addStorageToState(localStorageData));
        }
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        localStorage.setItem('localStorageData',JSON.stringify({items}));
        // eslint-disable-next-line
    }, [itemsInDelivery, arrivedItems]);

    const classes = useStyles();

    const columns = [
        { field: 'item', headerName: 'Item', flex: 3},
        { field: 'store', headerName: 'Store', flex: 2},
        { 
            field: 'price', 
            headerName: 'Price', 
            flex: 2, 
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return <span>{formatPrice(params.row.price, rate, currency)}</span>
            }
        },
        { 
            field: 'deliveryDate',
            headerName: 'Estimated delivery date',
            minWidth: 200,
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return <span>{moment(params.row.deliveryDate).format('DD/MM/yyyy')}</span>;
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 3,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return <div style={{width:'90%', display: 'flex', justifyContent:'space-between'}}>
                    <Button 
                        className={classes.button}
                        size="small"
                        sx={{fontSize: 12}} 
                        variant='outlined' 
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggleDelivery(items, params.row.id));
                        }}
                    >
                        {tab === 'delivery' ? 'Arrived' : 'In delivery'}
                    </Button>
                    <div className="icons">
                        <IconButton 
                            sx={{ml: 2}}
                            style={{color: '#5cff9a'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                                setItemData(params.row)
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton 
                            style={{color: '#ff5c5c'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(deleteItem(items, params.row.id));
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            }
        }
    ];
    return (<div className='section-center page'>
        <nav className='items-nav'>
            <div>
                <Button 
                    sx={responsiveBtns} 
                    variant={tab === 'delivery' ? 'contained' : 'outlined'}
                    onClick={() => setTab('delivery')}
                >In Delivery</Button>
                <Button 
                    sx={responsiveBtns} 
                    variant={tab === 'arrived' ? 'contained' : 'outlined'}
                    onClick={() => setTab('arrived')}
                >Arrived items</Button>
            </div>
            <div className="add-item">
                <FormDialog 
                    isEditing={isEditing} 
                    setIsEditing={setIsEditing} 
                    itemData={itemData} 
                    tab={tab} 
                    items={items} 
                />
            </div>
        </nav>
        <div className="table-wrapper">
            <DataTable 
                rows={tab === 'delivery' ? itemsInDelivery : arrivedItems} 
                columns={columns}
                sortModel={[{ field: 'deliveryDate', sort: 'desc' }]}
            />
        </div>
    </div>
    )
}

export default WithNavbarAndLoading(Home);