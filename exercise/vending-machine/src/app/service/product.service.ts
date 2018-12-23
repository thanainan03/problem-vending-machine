import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = environment.ProductListAPI;

  constructor(private http: HttpClient) { }
  getProductList() {
    return this.http.get(this.api);
  }
}
