import { ProductCategory } from "./ProductCategories";
import { ProductSituation } from "./ProductSituations";
export declare class Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    productSituation: ProductSituation;
    productCategory: ProductCategory;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Products.d.ts.map