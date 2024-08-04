import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  url = "https://fakestoreapi.in/api/products"
  constructor() { }

  async getProducts(): Promise<any> {
    try {
      const response = await fetch(`${this.url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }

  async getCategories(): Promise<any> {
    try {
      const response = await fetch(`${this.url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }
}
