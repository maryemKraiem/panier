import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-cart',
  standalone: false,
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.emit();
  }
}