import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartStore {
  // Signal principal pour stocker l'état du panier
  private cartItems = signal<CartItem[]>([]);

  // Sélecteurs publics (getters) pour utiliser les données dans les composants
  readonly items = this.cartItems.asReadonly();

  // État dérivé : nombre total d'articles dans le panier
  readonly totalItems = computed(() => 
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  // État dérivé : montant total du panier
  readonly totalAmount = computed(() => 
    this.cartItems().reduce((total, item) => 
      total + (item.product.price * item.quantity), 0)
  );

  // État dérivé : Vérifier si le panier est vide
  readonly isEmpty = computed(() => this.cartItems().length === 0);

  // Ajouter un produit au panier
  addProduct(product: Product): void {
    // Vérifier si le produit existe déjà dans le panier
    const existingItemIndex = this.cartItems().findIndex(item => 
      item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      // Si le produit existe déjà, augmenter la quantité
      this.updateQuantity(existingItemIndex, this.cartItems()[existingItemIndex].quantity + 1);
    } else {
      // Sinon, ajouter un nouvel article
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  // Supprimer un produit du panier
  removeProduct(index: number): void {
    this.cartItems.update(items => items.filter((_, i) => i !== index));
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(index: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      // Si la quantité est négative ou nulle, supprimer l'article
      this.removeProduct(index);
      return;
    }

    this.cartItems.update(items => {
      // Créer une nouvelle liste pour respecter l'immutabilité
      const updatedItems = [...items];
      updatedItems[index] = { 
        ...updatedItems[index], 
        quantity: newQuantity 
      };
      return updatedItems;
    });
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems.set([]);
  }
}