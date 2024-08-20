import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTrash,faPen,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, ViewChild } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { Product, ProductForm } from "../_models";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PopupComponent } from "../popup/popup.component";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-admin-home",
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, FaIconComponent, PopupComponent],
  templateUrl: "./admin-home.component.html",
  styleUrl: "./admin-home.component.css",
})
export class AdminHomeComponent {
  @ViewChild('popup') popup!: PopupComponent;
  @ViewChild('productForm') productForm!: PopupComponent;
  faPlus = faPlus;
  products: Product[] = [];
  selectedProduct?: Product;
  faTrash = faTrash;
  faPen = faPen;
  constructor(private productService: ProductService,private toastrService: ToastrService) {}
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.products.subscribe((products) => {
      this.products = products;
    });
  }
  
  onClickAddProduct():void {
    this.productForm.showPopup();
  }

  select(product: Product) {
    this.selectedProduct = product;
    this.popup.showPopup();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((_) => {
      this.getProducts();
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(
      _ => {this.popup.closePopup();this.toastrService.success("Updated Product " + product.name);},
    );
  }

  addProduct(product: ProductForm) {
    this.productService.addProduct(product).subscribe((res) => {
      this.getProducts();
      this.productForm.closePopup();
      this.toastrService.success("Added Product " + res.name);
    });
  }
  
}
