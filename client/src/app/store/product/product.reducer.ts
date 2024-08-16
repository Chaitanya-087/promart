import { loadProducts, loadProductsSuccess } from './product.actions';

import { createReducer,on } from '@ngrx/store';
import { Product } from 'src/app/_models';

export const initialState: Product[] = [];

export const productReducer = createReducer(
    initialState,
    on(loadProducts, state => {
        return {...state,loading:true};
    }),
    on(loadProductsSuccess, (state,{products}) => {
        return {...state,loading:false,products};
    })
);