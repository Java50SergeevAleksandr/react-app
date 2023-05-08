import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ordersService } from "../../config/orders-service-config";
import { ProductType } from "../../model/ProductType";
import { ShoppingProductType } from "../../model/ShoppingProductType";


export const ProductsClient: React.FC = () => {
    const products: ProductType[] = useSelector<any, ProductType[]>(state => state.productsState.products);
    const navigate = useNavigate();
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    const shopping = useSelector<any, ShoppingProductType[]>(state => state.shoppingState.shopping);
    const counts = useMemo(() => getCounts(), [products, shopping])

    function getCounts(): number[] {
        return products.map(p => getCountProduct(p))
    }
    function getCountProduct(product: ProductType): number {
        const shoppingProduct: ShoppingProductType | undefined = shopping.find(s => s.id === product.id);
        let count: number = 0;
        if (shoppingProduct) {
            count = shoppingProduct.count;
        }
        return count;
    }

    return (<Box sx={{ display: "flex", width: "95vw", margin: "auto", flexGrow: 1 }}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center" textAlign="center" spacing={{ xs: 3, md: 4 }}>
            {products.map((product, i) => (
                <Grid item xs={6} md={3} key={i} >
                    <Card sx={{}}>
                        <CardMedia
                            component="img"
                            alt={product.image}
                            height="200"
                            image={product.image.startsWith("http") || product.image.length > 40 ? product.image : `images/${product.image}`}
                        />
                        <CardContent sx={{ minHeight: "115px" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title.replace(/^./, product.title[0].toUpperCase()).replaceAll("-", " ")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1em" }}>
                                {`Unit: ${product.unit}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.1em" }}>
                                {product.cost} <img src="images/israeli-shekel-icon.svg" width="4%" />
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained" size="small" onClick={async () => {
                                if (authUser === '') {
                                    navigate("/login");
                                } else {
                                    ordersService.addShoppingProductUnit(authUser, product.id!);
                                }

                            }}><Add /></Button>

                            <Button variant="contained" size="small">{counts[i]}</Button>

                            <Button variant="contained" size="small" onClick={async () =>
                                ordersService.removeShoppingProductUnit(authUser, product.id!)} disabled={counts[i] === 0} ><Remove /></Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>)



}
