import {createAction, props} from '@ngrx/store';
import { Product } from 'src/app/_models';


export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{products: Product[]}>());
