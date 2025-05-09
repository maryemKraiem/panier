import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  // Dans un cas réel, ces données viendraient d'une API
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Smartphone Deluxe',
      description: 'Smartphone haut de gamme avec écran OLED et appareil photo 108MP',
      price: 799.99, 
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'Ordinateur portable performant avec processeur dernière génération',
      price: 1299.99, 
    },
    {
      id: 3,
      name: 'Écouteurs sans fil',
      description: 'Écouteurs bluetooth avec réduction de bruit active',
      price: 129.99, 
    },
    {
      id: 4,
      name: 'Montre Connectée',
      description: 'Montre intelligente avec suivi d\'activité et notifications',
      price: 249.99, 
    },
    {
      id: 5,
      name: 'Tablette Graphique',
      description: 'Idéale pour les designers et illustrateurs',
      price: 199.99, 
    }
  ]);

  // Exposer la liste des produits en lecture seule
  readonly allProducts = this.products.asReadonly();
}