import { Box, Avatar, Typography, Snackbar, Alert, Button, useMediaQuery } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { ShoppingProductType } from "../../model/ShoppingProductType"
import { ShoppingProductDataType } from "../../model/ShoppingProductDataType"
import { useMemo, useRef, useState } from "react"
import { ordersService } from "../../config/orders-service-config"
import { Delete } from "@mui/icons-material"
import { ConfirmationDialog } from "../ConfirmationDialog"
import { RotateNeed } from "../RotateNeed"

const UPDATE = 'Updating count of shopping product?';
const REMOVE = 'Removing shopping product?';

export const ShoppingCart: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const products = useSelector<any, ProductType[]>(state => state.productsState.products);
    const shopping = useSelector<any, ShoppingProductType[]>
        (state => state.shoppingState.shopping);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const tableData = useMemo(() => getTableData(), [products, shopping]);
    const total = useMemo(() => getTotalCost(), [tableData]);
    const title = useRef<string>('');
    const content = useRef<string>('');
    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
    const row = useRef<any>();
    const idRef = useRef<string>('');
    const portrait = useMediaQuery('(max-width: 600px)');

    function getTotalCost(): number {
        return tableData.reduce((res, cur) => res + cur.price, 0);
    }

    function getTableData(): ShoppingProductDataType[] {
        const shoppingData: ShoppingProductDataType[] = shopping.map(s => getShoppingProduct(s))
        return shoppingData.filter(sd => sd.id)
    }

    function getShoppingProduct(shoppingProduct: ShoppingProductType): ShoppingProductDataType {
        const product: ProductType | undefined = products.find
            (p => shoppingProduct.id === p.id);
        let res: ShoppingProductDataType = {
            id: "", category: '', cost: 0, count: 0,
            title: '', image: '', price: 0, unit: ''
        };
        if (!product) {
            ordersService.removeShoppingProduct(authUser, shoppingProduct.id);
        } else {
            res = { ...product, count: shoppingProduct.count, price: +(product.cost * shoppingProduct.count).toFixed(2) };
        }
        return res;

    }

    async function updateCount(newRow: any, oldRow: any): Promise<any> {
        const rowData: ShoppingProductDataType = newRow;
        if (rowData.count < 1) {
            throw 'count must be greater than 0'
        }
        row.current = newRow;
        title.current = UPDATE;
        content.current = `You are going to update shopping count of the ${rowData.title}(${rowData.unit})
        from ${oldRow.count} to ${rowData.count}`
        setOpenConfirmation(true)
        return oldRow;
    }

    function closeFn(isAgree: boolean) {
        if (isAgree) {
            if (title.current == UPDATE) {
                const rowData: ShoppingProductType = row.current;
                ordersService.addShoppingProduct(authUser,
                    rowData.id!, { id: rowData.id!, count: rowData.count })
            } else {
                ordersService.removeShoppingProduct(authUser, idRef.current)
            }

        }
        setOpenConfirmation(false);
    }

    const columns: GridColDef[] = [
        {
            field: 'image', headerName: '', flex: 0.5, align: 'center', sortable: false,
            headerAlign: 'center',
            renderCell: (params) => <Avatar src={params.value.startsWith("http") || params.value.length > 40 ? params.value :
                `images/${params.value}`} sx={{ width: "50%", height: "12vh" }} />
        },
        {
            field: 'title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center'
        },
        { field: 'unit', headerName: 'Unit', flex: 0.3 },
        { field: 'cost', headerName: 'Cost(NIS)', flex: 0.3, type: 'number' },
        { field: 'count', headerName: 'Count', flex: 0.3, editable: true, type: 'number' },
        { field: 'price', headerName: 'Price', flex: 0.2, type: 'number' },
        {
            field: 'actions', type: 'actions', flex: 0.1, getActions: (params) => [
                <GridActionsCellItem label="remove" icon={<Delete />}
                    onClick={() => {
                        idRef.current = params.id as string;
                        title.current = REMOVE;
                        content.current = `you are going to remove shopping of the product 
                ${params.row.title}(${params.row.unit})`
                        setOpenConfirmation(true);
                    }}
                />
            ]
        }

    ]
    return portrait ? <RotateNeed />
        : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
            <Box sx={{ height: '60vh', width: '70vw' }}>
                <DataGrid columns={columns} rows={tableData} getRowHeight={() => 'auto'}
                    processRowUpdate={updateCount}
                    onProcessRowUpdateError={(error) => {
                        alertMessage.current = error;
                        setOpen(true)
                    }} />
            </Box>

            <Typography variant="h6">Total cost: {total.toFixed(2)}{' '}
                <img src="images/israeli-shekel-icon.svg" width="3%" /></Typography>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                    {alertMessage.current}
                </Alert>
            </Snackbar>
            <Button onClick={async () => await ordersService.createOrder(authUser, tableData)}>ORDER</Button>
            <ConfirmationDialog open={openConfirmation} onCloseFn={closeFn} title={title.current} content={content.current} />
        </Box>
}



