import { Alert, Avatar, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { ProductType } from "../../model/ProductType"
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CategoryType } from "../../model/CategoryType";
import productsParameters from "../../config/product-parameters-config.json"

type Props = {
    submitFn: (product: ProductType) => string
}
const initialProduct: ProductType = {
    category: '', image: '', cost: 0, title: '', unit: ''
};
export const ProductForm: React.FC<Props> = ({ submitFn }) => {
    const categories = useSelector<any, CategoryType[]>(state => state.categoriesState.categories)
    const [product, setProduct] = useState<ProductType>(initialProduct);
    const [open, setOpen] = useState<boolean>(false);
    const alertMessage = useRef<string>('');

    function onSubmitFn(event: any) {
        event.preventDefault(); //canceling default form submit
        const errorMessage = submitFn(product);
        if (!errorMessage) {
            document.querySelector("form")!.reset()
        }
        else {
            setOpen(true);
            alertMessage.current = errorMessage
        }
    }

    function imageHandler(event: any) {
        const urlImage = event.target.value;
        setProduct({ ...product, image: urlImage });
    }

    function titleHandler(event: any) {
        setProduct({ ...product, title: event.target.value });
    }

    const categoryHandler = (event: SelectChangeEvent) => {
        setProduct({ ...product, category: event.target.value });
    };

    function getCategoryMenuItems(): import("react").ReactNode {
        return categories.map(v => <MenuItem value={v.name}>{v.name}</MenuItem>)
    }

    const unitHandler = (event: SelectChangeEvent) => {
        setProduct({ ...product, unit: event.target.value });
    };

    function getUnitMenuItems(): import("react").ReactNode {
        return productsParameters.units.map((v) => <MenuItem value={v}>{v}</MenuItem>)
    }
    const costHandler = (event: any) => {
        setProduct({ ...product, cost: event.target.value });
    };
    return <Box>
        <form onSubmit={onSubmitFn} onReset={() => { setProduct(initialProduct); }}>
            <Grid container spacing={4} justifyContent={'start'}>
                <Grid item xs={8} md={7}>
                    <TextField sx={{ m: 1, minWidth: 120 }} label='URL image'
                        required fullWidth value={product.image}
                        onChange={imageHandler} />
                </Grid>
                <Grid item xs={5}>
                    {product.image && <img height={"150vw"} src={product.image} />}
                </Grid>
                <Grid item xs={8} md={7}>
                    <TextField sx={{ m: 1, minWidth: 120 }} label='Title'
                        required fullWidth value={product.title}
                        onChange={titleHandler} />
                </Grid>
                <Grid item xs={8} md={7}>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="category-select-required-label">Category</InputLabel>
                        <Select
                            labelId="category-select-required-label"
                            id="category-select-required"
                            value={product.category}
                            label="Category *"
                            onChange={categoryHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {getCategoryMenuItems()}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={8} md={7}>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="unit-select-required-label">Unit</InputLabel>
                        <Select
                            labelId="unit-select-required-label"
                            id="unit-select-required"
                            value={product.unit}
                            label="Unit *"
                            onChange={unitHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {getUnitMenuItems()}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={8} md={7}>
                    <TextField sx={{ m: 1, minWidth: 120 }} label='Cost' type="number"
                        required fullWidth value={product.cost}
                        onChange={costHandler}
                        helperText={`enter cost in range [${productsParameters.minCost}-${productsParameters.maxCost}]`}
                        inputProps={
                            {
                                min: `${productsParameters.minCost}`,
                                max: `${productsParameters.maxCost}`
                            }}
                    />
                </Grid>
                <Grid item container spacing={5} justifyContent={'center'} xs={12}>
                    <Grid item xs={4}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type='reset'>Reset</Button>
                    </Grid>
                </Grid>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert severity="error" sx={{ width: '30vw', fontSize: '1.5em' }}>
                        {alertMessage.current}
                    </Alert>
                </Snackbar>
            </Grid>

        </form>
    </Box>
}


