import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  Products : any = [];
  CartItem : any;
  ProductDetails = new FormGroup({
    Code : new FormControl('',Validators.required),
    ProductQuantity : new FormControl('',Validators.required)
  });
  constructor(private service : DataServiceService,private route : ActivatedRoute,private router : Router) { }
  getProduct(ProductId : any){
    this.service.Get("Home/getProductById?ProductId=" + ProductId).subscribe(data => {
      this.Products.push(data);
    },
    error => {
      console.log("error from response",error);
    });
  }
  AddInCart(data : any){
    console.log(data);
    this.ProductDetails.patchValue({["Code"] : data,["ProductQuantity"] : 1});
    this.service.Post("Home/AddItemsInCart",this.ProductDetails.value).subscribe(data => {
      this.router.navigateByUrl("cart");
    },
    error => {
      console.log("response error",error);
    });
  }

  CheckIteminCart(){
    return this.CartItem;
  }
  CheckCartItem(data : any){
    this.service.Get("Home/CheckCartItemAvailability?ProductId=" + data).subscribe(data => {
      console.log(data);
      this.CartItem = data},
      error => {
        console.log("Error in response",error);
      });
  }
  ngOnInit() {
    let ProductId = this.route.snapshot.paramMap.get("ProductId");
    console.log("performed");
    console.log(ProductId);
    this.getProduct(ProductId);
    this.CheckCartItem(ProductId);
  }

}
