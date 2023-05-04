import { Box, Avatar, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { ShoppingProductType } from "../../model/ShoppingProductType"
import { ShoppingProductDataType } from "../../model/ShoppingProductDataType"
import { useMemo } from "react"
import { ordersService } from "../../config/orders-service-config"


export const ShoppingCart: React.FC = () => {
    const products = useSelector<any, ProductType[]>(state => state.productsState.products);
    const shopping = useSelector<any, ShoppingProductType[]>
        (state => state.shoppingState.shopping);
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const tableData = useMemo(() => getTableData(), [products, shopping]);
    const total = useMemo(() => getTotalCost(), [tableData]);
    function getTotalCost(): number {
        return tableData.reduce((res, cur) => res + cur.price, 0);
    }
    function getTableData(): ShoppingProductDataType[] {
        const shoppingData: ShoppingProductDataType[] = shopping.map(s => getShoppingProduct(s))
        return shoppingData.filter(sd => sd.id)
    }
    function getShoppingProduct(shoppingProduct: ShoppingProductType): ShoppingProductDataType {
        const product: ProductType | undefined = products.find
            (p => shoppingProduct.id == p.id);
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

    const columns: GridColDef[] = [
        {
            field: 'image', headerName: '', flex: 0.5, align: 'center', headerAlign: 'center',
            renderCell: (params) => <Avatar src={`images/${params.value}`} sx={{ width: "50%", height: "12vh" }} />
        },
        { field: "title", headerName: 'Title', flex: 0.8 },
        { field: "unit", headerName: "Unit", flex: 0.4 },
        { field: "cost", headerName: "Price (NIS)", flex: 0.3 },
        { field: "count", headerName: "Count of the product units count", flex: 0.5 },
        { field: "price", headerName: `Total cost (NIS)`, flex: 0.5 }
    ]
    return <>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
            <Box sx={{ height: '60vh', width: '70vw' }}>
                <DataGrid columns={columns} rows={tableData} getRowHeight={() => 'auto'} />
            </Box>

            <Typography variant="h6">Total cost: {total.toFixed(2)}{' '}
                <img src="images/israeli-shekel-icon.svg" width="3%" /></Typography>

        </Box>
    </>

}



