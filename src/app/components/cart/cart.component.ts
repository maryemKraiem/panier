import { Component, inject } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  protected cartStore = inject(CartStore);

  removeItem(index: number): void {
    this.cartStore.removeProduct(index);
  }

  updateQuantity(index: number, newQuantity: any): void {
    // Conversion en nombre si c'est une chaîne de caractères (depuis l'input)
    const quantity = typeof newQuantity === 'string' 
      ? parseInt(newQuantity, 10) 
      : newQuantity;
      
    if (!isNaN(quantity)) {
      this.cartStore.updateQuantity(index, quantity);
    }
  }

  clearCart(): void {
    this.cartStore.clearCart();
  }
}