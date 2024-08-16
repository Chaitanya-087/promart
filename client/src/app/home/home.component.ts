import { CartService } from './../_services/cart.service';
import { Component } from '@angular/core';
import { Category, Product, Role } from '../_models';
import { ProductService } from '../_services/product.service';
import { faCartPlus,faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../_models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
// import { loadProductsSuccess } from '../store/product/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  roles=  Role;
  faCartPlus = faCartPlus;
  faPlus = faPlus;
  faMinus = faMinus;
  products$: Observable<Product[]> = this.store.select(state => state.products.products);
  products: Product[] = [];
  cartItems: CartItem[] = [];
  filteredProducts?: Product[] = this.products;
  quantities: {[productId: number]: number} = {};
  categories!: Category[];
  key: string = 'all';

  constructor(private store: Store<{products:{products:Product[]}}>,private productService: ProductService,private cartService: CartService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAvailableProducts();
    // this.store.dispatch(loadProductsSuccess({products: this.products}));
    this.getCategories();
    this.getCartItems();
  }

  getCategories(): void {
    this.productService.categories.subscribe(categories => this.categories = [{id:-1,name:"all"},...categories]);
  }

  getCartItems(): void {
    this.cartService.cartItems.subscribe(items => this.cartItems = items);
  }

  getAvailableProducts(): void {
    this.productService.getAvailableProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      products.forEach(p => this.quantities[p.id] = 1);
    });
  }

  filter(name: string): void {
    this.filteredProducts = this.products;
    this.key = name;
    if (name != 'all') {
      this.filteredProducts = this.products?.filter(p => p.categoryName.toLowerCase() === name.toLowerCase());
    }
  }

  addToCart(productId:number,quantity:number): void {
    this.cartService.addToCart(productId,quantity).subscribe((res) => {
      this.getCartItems();
      this.toastrService.success(res.message);
      this.quantities[productId] = 1;
    });
  }
  
}
