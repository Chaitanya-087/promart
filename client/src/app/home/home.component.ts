import { CartService } from './../_services/cart.service';
import { Component } from '@angular/core';
import { Category, Product, Role } from '../_models';
import { ProductService } from '../_services/product.service';
import { faCartPlus,faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

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
  products: Product[] = [];
  filteredProducts?: Product[] = this.products;
  quantities: {[productId: number]: number} = {};
  categories!: Category[];

  key: string = 'all';

  constructor(private productService: ProductService,public cartService: CartService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAvailableProducts();
    this.getCategories();
  }

  getCategories(): void {
    this.productService.categories.subscribe(categories => this.categories = [{id:-1,name:"all"},...categories]);
  }

  getAvailableProducts(): void {
    this.productService.getAvailableProducts().subscribe(products => {
      this.products = products.sort((a, b) => a.id - b.id);
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
      this.toastrService.success(res.message);
      this.quantities[productId] = 1;
    });
  }
  
}
