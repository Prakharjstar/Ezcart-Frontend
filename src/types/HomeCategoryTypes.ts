import { Deal } from "./dealTypes";


export type HomeSection =
  | "GRID"
  | "SHOP_BY_CATEGORY"
  | "ELECTRIC_CATEGORY"
  | "DEAL_CATEGORY";



export interface HomeCategory {
  id?: number;
  categoryId: string;
  section?: HomeSection;
  name?: string;
  image: string;
  parentCategoryId?: string;
}



 
export interface HomeData {
  id: number;

  grid: HomeCategory[];

  shopByCategories: HomeCategory[];

  electricCategories: HomeCategory[];

  deals: Deal[];

  dealCategories: HomeCategory[];
}