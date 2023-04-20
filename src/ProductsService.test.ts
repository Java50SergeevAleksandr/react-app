import { productsService } from "./config/products-service-config"
import productsConfig from "./config/products-config.json"
import { getRandomNumber } from "./util/random";

test("setProducts test", async () => {
    const count = await productsService.setProducts();
    expect(count).toEqual(productsConfig.length);
})
test("category bread exists", async () => {
    const res = await productsService.isCategoryExist("bread");
    return expect(res).toBeTruthy();
})
test("category kukureku doesn't exist", async () => {
   const res = await productsService.isCategoryExist("kukureku");
    return expect(res).toBeFalsy();
})

// ===============HW#42===============

test("Random category exists", async () => {
    jest.setTimeout(20000);
    const categories: string[] = productsConfig.map(pc =>
        pc.name.split("-")[0]).reduce((r: Array<string>, v) => {
            if (!r.includes(v)) {
                r.push(v)
            }
            return r
        }, []);

    const categoryNumber = getRandomNumber(0, categories.length - 1);
   const res = await productsService.isCategoryExist(categories[categoryNumber]);
    return expect(res).toBeTruthy();
})

test("Remove category", async () => {
  const v = await productsService.removeCategory("bread");
    const res = await productsService.isCategoryExist("bread");
    return expect(res).toBeFalsy();
})

test("Add category", async () => {
    const v = await productsService.addCategory({ name: "bread" });
    const res = await productsService.isCategoryExist("bread");
    return expect(res).toBeTruthy();
})

test("All categories exists", async () => {
    const categories: string[] = productsConfig.map(pc =>
        pc.name.split("-")[0]).reduce((r: Array<string>, v) => {
            if (!r.includes(v)) {
                r.push(v)
            }
            return r
        }, []);

        const arP = await Promise.all(categories.map((v_1) => productsService.isCategoryExist(v_1)));
    const v_3 = arP.map(v_2 => v_2);
    return expect(v_3.every(b => b === true)).toBeTruthy();
})