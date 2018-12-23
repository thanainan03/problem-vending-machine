import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import swal from 'sweetalert';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = []; //Product rray get from service 
  productName: string; //Product name to show getItem
  total:number = 0; //Total Money
  gotItem: boolean = false; //Boolean for disble button
  gotChange: boolean = false; //Boolean for disble button
  tencoin: number = 0; //Count of 10฿
  fivecoin: number = 0; //Count of 5฿
  twocoin: number = 0; //Count of 2฿
  onecoin: number = 0; //Count of 1฿
  constructor(private productService : ProductService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productList()
  }

  //get Product Array from service
  productList() {
    this.productService.getProductList().subscribe((data:any) => {
      this.products = data.data;
      console.log(this.products)
    })
  }

  selectProduct(id: number) {
    // Find product from id
    let product = this.products.find(item => item.id == id)
    // Check product stock
    if(product.in_stock) {
      // Check user have money
      if(this.total > 0) {
        //Check user can buy product
        if(this.total >= product.price) {
          //Alert confirm to buy
          swal({text: 'Are you sure to buy '+product.name,
            buttons: {
              cancel: true,
              confirm: true,
            },
          }).then((success) => {
            if(success) { 
                this.gotItem = true; //Set true to show button push
                this.productName = product.name; //Set product name
                //Calculate num;
                if(this.total >= product.price){
                  var num = this.total - product.price;
                  this.changeCoin(num)
                }
             }
          })
        }else { this.CoinNotEnoughAlert(product.name) }

      }else { this.noCoinAlert() }

    }else { this.outOfstockAlert(product.name) }
  }
  //Calculate Change
  calculateChange(num: number) {
    var remain = 0;
    this.tencoin = (num / 10) | 0;
    remain = num % 10;
    this.fivecoin = (remain / 5) | 0;
    remain = remain % 5;
    this.twocoin = (remain / 2) | 0;
    this.onecoin = remain % 2;
  }
  //alert if out of stock
  outOfstockAlert(name: string) {
    this.snackBar.open(name + ' is out of stock.', 'close', {
      duration: 3000
    });
  }
  //alert if no coin
  noCoinAlert() {
    this.snackBar.open('Please insert coins!', 'close', {
      duration: 3000
    });
  }
  //alrt if cannot refund
  NoMoneyToRefundAlert() {
    this.snackBar.open('Can not refund.', 'close', {
      duration: 3000
    });
  }
  //alert if coin not enough to buy
  CoinNotEnoughAlert(name: string) {
    this.snackBar.open('Your money not enough to buy ' + name+'.', 'close', {
      duration: 3000
    });
  }
  //Get total coin 
  insertCoin(num : number) {
    this.total += num;
  }
  
  changeCoin(num) {
    if(num != 0) {
      this.calculateChange(num) //Calculate Change from total - price
      this.gotChange = true; //Set true to show button change
    }
    this.total = 0; //Set total = 0
  }

  refundCoin() {
    //Check user have money to refund
    if(this.total != 0) {
      this.gotChange = true; //Set true to show button change
      this.calculateChange(this.total) //Calculate refund from total money
      this.total = 0; //Set total = 0
    }else { this.NoMoneyToRefundAlert() }    
  }
  //Alert to show product from user buy
  getItem() {
    swal(`Your get ${ this.productName }`);
    this.gotItem = false;
  }
  //Alert to show change from money
  getChange() {
    swal(`Your change is 10฿x${ this.tencoin }, 5฿x${ this.fivecoin }, 2฿x${ this.twocoin } and 1฿x${ this.onecoin } `);
    this.gotChange = false;
  }

}
