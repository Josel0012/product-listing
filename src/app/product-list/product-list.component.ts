import { Component, Input } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: any[] = []
  filteredProducts: any[] = []
  categories: any[] = []
  showFullDescription: boolean[] = Array(this.products.length).fill(false);

  constructor(private productService: ProductsServiceService) {
    this.fetchProducts();
    this.fetchCategories();
  }

  toggleShowMore(index: number) {
    this.showFullDescription[index] = !this.showFullDescription[index];
  }

  async fetchProducts() {
    try {
      this.products = await this.productService.getProducts();
      this.filteredProducts = this.products
    } catch (error) {
      console.error('Error fetching data in component: ', error);
    }
  }

  async fetchCategories() {
    try {
      this.categories = await this.productService.getCategories();
      console.log(this.categories);
    } catch (error) {
      console.error('Error fetching data in component: ', error);
    }
  }

  async filterByCategory(category: string) {
    this.filteredProducts = this.products.filter(product => product.category === category)
  }
}
