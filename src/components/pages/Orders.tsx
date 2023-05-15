import { LocalShipping, Visibility } from "@mui/icons-material";
import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ordersService } from "../../config/orders-service-config";
import { OrderType } from "../../model/OrderType";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { OrderContent } from "../OrderContent";

export const Orders: React.FC = () => {
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const orders = useSelector<any, OrderType[]>(state => state.ordersState.orders);
    const [open, setOpen] = useState<boolean>(false);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [openContent, setOpenContent] = useState(false);
    const columns: GridColDef[] = useMemo(() => getColumns(), [authUser, orders]);
    const orderId = useRef('');
    const alertMessage = useRef<string>('');
    const dialogState = useRef<any>({
        message: "",
        action: () => '',
    });

    function getTotalCost(params: GridValueGetterParams): number {
        return params.row.shopping.reduce((res: number, cur: { price: number; }) => res + cur.price, 0);
    }



    function getColumns(): GridColDef<OrderType, any, any>[] {
        const commonColumns: GridColDef[] = [
            {
                field: 'id', headerName: 'Order ID', flex: 0.4, align: 'center', headerAlign: 'center'
            },

            { field: 'amount', valueGetter: ({ row }) => row.shopping.length, headerName: 'Products Amount', flex: 0.3, type: 'number', align: 'center', headerAlign: 'center' },
            { field: 'price', valueGetter: getTotalCost, headerName: 'Price', flex: 0.2, type: 'number', align: 'center', headerAlign: 'center' },
            { field: 'orderDate', headerName: 'Order Date', flex: 0.3, align: 'center', headerAlign: 'center' },
            { field: 'deliveryDate', headerName: 'DeliveryDate', flex: 0.3, align: 'center', headerAlign: 'center', editable: authUser.includes('admin') },
            {
                field: 'actions', type: 'actions', flex: 0.2, getActions: (params) => {
                    const res = [<GridActionsCellItem label="details"
                        icon={<Visibility />}
                        onClick={() => {
                            orderId.current = params.id as string;
                            setOpenContent(true);
                        }} />]
                    if (authUser.includes("admin")) {
                        res.push(<GridActionsCellItem label="delivery"
                            icon={<LocalShipping />}
                            disabled={!!params.row.deliveryDate}
                            onClick={async () => {
                                const updatedOrder = { ...params.row };
                                updatedOrder.deliveryDate = new Date().toISOString().substring(0, 10);
                                await ordersService.updateOrder(updatedOrder)
                            }} />)

                    }
                    return res;
                }
            }
        ]

        const adminColumns: GridColDef[] = [
            { field: 'email', headerName: 'Email', flex: 0.3, align: 'center', headerAlign: 'center' }
        ]
        return authUser.includes('admin') ? adminColumns.concat(commonColumns) : commonColumns
    }

    async function updateDate(newRow: any, oldRow: any): Promise<any> {
        const rowData: OrderType = newRow;
        const date = Date.parse(rowData.deliveryDate);
        let confirm = false;
        if (isNaN(date)) {
            throw 'Date not in format YYYY-MM-DD, or contains illegal date values'
        }

        if (rowData.orderDate > rowData.deliveryDate) {
            throw 'Date must not be less than the OrderDate'
        }

        if (new Date().toISOString().substring(0, 10) < rowData.deliveryDate) {
            throw 'Date must not be greater than the current date'
        }

        dialogState.current.message = `Update date to ${rowData.deliveryDate} ?`;
        dialogState.current.action = async () => {
            await ordersService.updateOrder(rowData);
            confirm = true;
        };
        setDialogOpen(true);

        return confirm ? newRow : oldRow       
    }

    return <Box>
        <Box sx={{ width: "80vw", height: "60vh" }}>
            <DataGrid columns={columns} rows={orders} getRowHeight={() => 'auto'}
                processRowUpdate={updateDate}
                onProcessRowUpdateError={(error) => {
                    alertMessage.current = error;
                    setOpen(true)
                }}
            />
        </Box>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
        <Modal open={openContent} onClose={() => setOpenContent(false)}>
            <Box>
                <OrderContent orderId={orderId.current} />
            </Box>
        </Modal>
        <ConfirmationDialog isOpen={isDialogOpen} message={dialogState.current.message} state={setDialogOpen} action={dialogState.current.action} />
    </Box>

}


