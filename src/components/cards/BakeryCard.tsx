import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductType } from "../../model/ProductType";

type Props = {
    product: ProductType
}
export const BakeryCard: React.FC<Props> = ({ product }) => {
    return (
        <Card sx={{}}>
            <CardMedia
                component="img"
                alt={product.image}
                height="200"
                image={`images/${product.image}`}
            />
            <CardContent sx={{ minHeight: "115px" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title.replace(/^./, product.title[0].toUpperCase()).replaceAll("-", " ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Unit: ${product.unit}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Cost: ${product.cost} NIS`}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" size="small">+</Button>
                <Button variant="contained" size="small">0</Button>
                <Button variant="contained" size="small">-</Button>
            </CardActions>
        </Card>
    );
}