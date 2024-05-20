import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  url = "https://fakestoreapi.com/products"
  constructor() { }

  async getProducts(): Promise<any> {
    try {
      const response = await fetch(`${this.url}`);
      console.log("FETCHHH");
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
      const response = await fetch(`${this.url}/categories`);
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
