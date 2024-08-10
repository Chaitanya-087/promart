import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock/products';
import { Category, Product } from '../_models';
import { CATEGORIES } from '../mock/categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private products: Product[] = PRODUCTS;
  filteredProducts: Product[] = this.products;
  categories: Category[] = [{id:0,name:"all"},...CATEGORIES];
  tabIndex: number = 0;

  filter(id: number): void {
    this.filteredProducts = this.products;
    this.tabIndex = id;
    if (id > 0) {
      this.filteredProducts = this.products.filter(p => p.category.id === id)
    }
  }

}
