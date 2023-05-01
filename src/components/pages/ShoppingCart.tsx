import { Box, Avatar, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ProductType } from "../../model/ProductType"
import { useSelector } from "react-redux"
import { ShoppingProductType } from "../../model/ShoppingProductType"
import { ShoppingProductDataType } from "../../model/ShoppingProductDataType"
import { useMemo } from "react"


export const ShoppingCart: React.FC = () => {
    const productsState: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const shoppingCart: ShoppingProductType[] = useSelector<any, ShoppingProductType[]>(state => state.shoppingState.shopping);
    const tableData = useMemo(() => getTableData(), [productsState, shoppingCart]);

    function getTableData(): ShoppingProductDataType[] {
        return shoppingCart.map(v => {
            const index = productsState.find(e => e.id === v.id);
            const obj = {
                id: v.id,
                count: v.count,
                title: index!.title,
                category: index!.category,
                unit: index!.unit,
                cost: index!.cost,
                image: index!.image,
                totalCost: v.count * index!.cost,
            }           
            return obj           
        })
    }

    function getTotalCost() {
        return tableData.reduce((r, v) => r + v.totalCost, 0)
    }

    const columns: GridColDef[] = [
        {
            field: "image", headerName: 'Image', flex: 1,
            renderCell: (params) => <Avatar src={`images/${params.value}`}
                sx={{ width: "30%", height: "80px" }} />, align: "center", headerAlign: "center"
        },
        { field: "title", headerName: 'Title', flex: 0.8 },
        { field: "unit", headerName: "Unit", flex: 0.4 },
        { field: "cost", headerName: "Price (NIS)", flex: 0.3 },
        { field: "count", headerName: "Count of the product unitsount", flex: 0.5 },
        { field: "totalCost", headerName: `Total cost (NIS)`, flex: 0.5 }
    ]
    return <>
        <Box sx={{ width: "80vw", height: "50vh" }}>
            <DataGrid columns={columns} rows={tableData} getRowHeight={() => 'auto'} />
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "2.2em", display: "flex", width: "100%", height: "100%", justifyContent: "right" }}>
                {` Total cost: ${getTotalCost()} NIS`}
            </Typography>
        </Box>
    </>

}



