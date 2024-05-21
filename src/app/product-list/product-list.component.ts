import { AfterViewInit, Component,  } from '@angular/core';
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
  category: string = 'All'
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
    // const defaultCategory: any = document.querySelector('#all');
    // defaultCategory.classList.add('active')
    try {
      this.categories = await this.productService.getCategories();
      this.categories.unshift('all');
    } catch (error) {
      console.error('Error fetching data in component: ', error);
    }
  }

  async filterByCategory(category: string) {
    this.category = category
    if(category === 'all'){
      this.filteredProducts = this.products;
      return
    }
    this.filteredProducts = this.products.filter(product => product.category === category)
  }

  setActive(clickedItem: HTMLElement): void {
    const listItems = document.querySelectorAll('.categories button');
    listItems.forEach((item) => item.classList.remove('active'));

    clickedItem.classList.add('active');
  }
}
