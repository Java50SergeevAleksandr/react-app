import { productsService } from "./config/products-service-config"
import productsConfig from "./config/products-config.json"
import { getRandomNumber } from "./util/random";

test("setProducts test", () => {
    productsService.setProducts().then(count => {
        expect(count).toEqual(productsConfig.length);
    })
})
test("category bread exists", () => {
    productsService.isCategoryExist("bread")
        .then(res => expect(res).toBeTruthy());
})
test("category kukureku doesn't exist", () => {
    productsService.isCategoryExist("kukureku")
        .then(res => expect(res).toBeFalsy());
})

// ===============HW#42===============

test("Random category exists", () => {
    const categories: string[] = productsConfig.map(pc =>
        pc.name.split("-")[0]).reduce((r: Array<string>, v) => {
            if (!r.includes(v)) {
                r.push(v)
            }
            return r
        }, []);

    const categoryNumber = getRandomNumber(0, categories.length - 1);
    productsService.isCategoryExist(categories[categoryNumber])
        .then(res => expect(res).toBeTruthy());
})

test("Remove category", () => {
    productsService.removeCategory("bread")
        .then(v => productsService.isCategoryExist("bread")
            .then(res => expect(res).toBeFalsy()))
})

test("Add category", () => {
    productsService.addCategory({ name: "bread" })
        .then(v => productsService.isCategoryExist("bread")
            .then(res => expect(res).toBeTruthy()))
})

test("All categories exists", () => {
    const categories: string[] = productsConfig.map(pc =>
        pc.name.split("-")[0]).reduce((r: Array<string>, v) => {
            if (!r.includes(v)) {
                r.push(v)
            }
            return r
        }, []);

    Promise.all(categories.map((v) => productsService.isCategoryExist(v)))
        .then(arP => arP.map(v => v))
        .then(v => expect(v.every(b => b === true)).toBeTruthy());
})