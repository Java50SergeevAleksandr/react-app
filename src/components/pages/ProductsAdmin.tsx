import { Box, Avatar, Alert, Snackbar } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { Delete } from "@mui/icons-material"
import { productsService } from "../../config/products-service-config"
import { useRef, useState } from "react"

export const ProductsAdmin: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const columns: GridColDef[] = [
        {
            field: 'image', headerName: '', flex: 0.5, align: 'center', sortable: false,
            headerAlign: 'center',
            renderCell: (params) => <Avatar src={`images/${params.value}`} sx={{ width: "50%", height: "12vh" }} />
        },
        { field: 'title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        { field: "category", headerName: "Category", flex: 0.5, align: 'center', headerAlign: 'center' },
        { field: "unit", headerName: "Unit", flex: 0.2 },
        { field: "cost", headerName: "Cost (NIS)", flex: 0.2, editable: true, type: "number" },
        {
            field: "actions", type: "actions", flex: 0.1, getActions: (params) => [
                <GridActionsCellItem label="remove" icon={<Delete />} onClick={async () => await productsService.removeProduct(params.id as string)} />
            ]
        }
    ]

    async function updateCost(newRow: any, oldRow: any): Promise<any> {
        const rowData: ProductType = newRow;
        const oldRowData: ProductType = oldRow;
        if (rowData.cost < 1) {
            throw 'Price must be greater than 0'
        }
        if (Math.abs(rowData.cost - oldRowData.cost) > oldRowData.cost * 0.5) {
            throw 'Price  cannot be greater than on 50% from the existing cost'
        }
        await productsService.changeProduct(rowData);
        return newRow
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
        <Box sx={{ width: "80vw", height: "50vh" }}>
            <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
                processRowUpdate={updateCost}
                onProcessRowUpdateError={(error) => {
                    alertMessage.current = error;
                    setOpen(true)
                }} />
        </Box>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                {alertMessage.current}
            </Alert>
        </Snackbar>
    </Box>
}