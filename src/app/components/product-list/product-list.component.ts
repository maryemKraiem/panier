import { Component, inject } from '@angular/core';
import { CartStore } from '../../store/cart.store';
import { ProductStore } from '../../store/product.store';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  protected productStore = inject(ProductStore);
  private cartStore = inject(CartStore);

  addToCart(product: Product): void {
    this.cartStore.addProduct(product);
  }
}