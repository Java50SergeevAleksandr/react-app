import { Box, Grid } from "@mui/material"
import { useSelector } from "react-redux";
import { ProductType } from "../../model/ProductType";
import { BakeryCard } from "../cards/BakeryCard";

export const ProductsClient: React.FC = () => {
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);


    return (<Box sx={{ display: "flex", width: "95vw", margin: "auto", flexGrow: 1 }}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center" textAlign="center" spacing={{ xs: 3, md: 4 }}>
            {products.map((v, i) => (
                <Grid item xs={6} md={3} key={i} >
                    <BakeryCard product={v}></BakeryCard>
                </Grid>
            ))}
        </Grid>
    </Box>)



}
