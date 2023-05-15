import { Box, Avatar, Alert, Snackbar, Button } from "@mui/material"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { Add, Delete } from "@mui/icons-material"
import { productsService } from "../../config/products-service-config"
import { useRef, useState } from "react"
import { ProductForm } from "../forms/ProductForm"
import { ConfirmationDialog } from "../ConfirmationDialog"

export const ProductsAdmin: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isProductAdd, setProductAdd] = useState<boolean>(false);
    const alertMessage = useRef<string>('');
    const dialogState = useRef<any>({       
        message: "",
        action: () => '',
    });
  
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);

    const columns: GridColDef[] = [
        {
            field: "image", headerName: '', flex: 0.3, editable: true,
            renderCell: (params) => <Avatar
                src={params.value.startsWith("http") || params.value.length > 40 ? params.value : `images/${params.value}`}
                sx={{ width: "90%", height: "80px" }} />, align: "center", headerAlign: "center"
        },
        { field: 'title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
        { field: "category", headerName: "Category", flex: 0.5, align: 'center', headerAlign: 'center' },
        { field: "unit", headerName: "Unit", flex: 0.2 },
        { field: "cost", headerName: "Cost (NIS)", flex: 0.2, editable: true, type: "number" },
        {
            field: "actions", type: "actions", flex: 0.1, getActions: (params) => [
                <GridActionsCellItem label="remove" icon={<Delete />} onClick={() => {
                    dialogState.current.message = 'Remove product from data-base?';
                    dialogState.current.action = async () => await productsService.removeProduct(params.id as string);
                    setDialogOpen(true);
                }} />
            ]
        }
    ]

    async function updateCost(newRow: any, oldRow: any): Promise<any> {
        const rowData: ProductType = newRow;
        const oldRowData: ProductType = oldRow;
        let confirm = false;
        if (rowData.cost < 1) {
            throw 'Price must be greater than 0'
        }
        if (Math.abs(rowData.cost - oldRowData.cost) > oldRowData.cost * 0.5) {
            throw 'Price  cannot be greater than on 50% from the existing cost'
        }

        dialogState.current.message = `Update cost to ${rowData.cost} ?`;
        dialogState.current.action = async () => {
            await productsService.changeProduct(rowData);
            confirm = true;
        };
        setDialogOpen(true);

        return confirm ? newRow : oldRow
    }


    function submitAddProduct(product: ProductType): string {
        const validation = products.find(v => (product.title === v.title && product.unit === v.unit))
        if (validation === undefined) {
            productsService.addProduct(product);
            setProductAdd(false);
            return '';
        } else {
            return 'Product already exist';
        }
    }

    return !isProductAdd ?
        <Box sx={{
            width: "100vw", display: "flex",
            flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
            <Box sx={{ width: "80vw", height: "60vh" }}>
                <DataGrid columns={columns} rows={products} getRowHeight={() => 'auto'}
                    processRowUpdate={updateCost}
                    onProcessRowUpdateError={(error) => {
                        alertMessage.current = error;
                        setOpen(true)
                    }} />
            </Box>
            <Button onClick={() => setProductAdd(true)}>
                <Add></Add>
            </Button>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                    {alertMessage.current}
                </Alert>
            </Snackbar>

            <ConfirmationDialog isOpen={isDialogOpen} message={dialogState.current.message} state={setDialogOpen} action={dialogState.current.action} />

        </Box> :
        <ProductForm submitFn={submitAddProduct}></ProductForm>;
}