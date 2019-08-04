import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = 'https://www.mocky.io/v2/5c77c5b330000051009d64c9';

  constructor(private http: HttpClient) { }
  getProductList() {
    return this.http.get(this.api);
  }
}
