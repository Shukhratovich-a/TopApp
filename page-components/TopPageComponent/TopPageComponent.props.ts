import { ProductModel } from "../../interfaces/product.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/toppage.interface";

export interface TopPageComponentProps {
  page: TopPageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}
