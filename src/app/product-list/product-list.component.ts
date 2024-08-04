import { AfterViewInit, Component } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

interface ProductsResponse {
  status: string;
  message: string;
  products: Product[];
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  category: string = 'All';
  showFullDescription = Array(this.products.length).fill(false);
  currenIndex!: number;

  constructor(private productService: ProductsServiceService) {
    this.fetchProducts();
    this.fetchCategories();
  }

  toggleShowMore(index: number) {
    this.showFullDescription[this.currenIndex] = !this.showFullDescription[this.currenIndex];
    this.showFullDescription[index] = !this.showFullDescription[index];
    this.currenIndex = index;
  }

  async fetchProducts() {
    try {
      const products: ProductsResponse = await this.productService.getProducts();
      this.products = products.products;
      this.filteredProducts = this.products;
    } catch (error) {
      console.error('Error fetching data in component: ', error);
    }
  }

  async fetchCategories() {
    // const defaultCategory: any = document.querySelector('#all');
    // defaultCategory.classList.add('active')
    try {
      const categories: ProductsResponse = await this.productService.getCategories();
      this.categories = categories.products.map((item) => item.category);
      this.categories = [...new Set(this.categories)];
      this.categories.unshift('all');
    } catch (error) {
      console.error('Error fetching data in component: ', error);
    }
  }

  async filterByCategory(category: string) {
    this.category = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter(
      (product) => product.category === category
    );
  }

  setActive(clickedItem: HTMLElement): void {
    const listItems = document.querySelectorAll('.categories button');
    listItems.forEach((item) => item.classList.remove('active'));

    clickedItem.classList.add('active');
  }
}
