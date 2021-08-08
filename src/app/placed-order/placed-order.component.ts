import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-placed-order',
  templateUrl: './placed-order.component.html',
  styleUrls: ['./placed-order.component.css']
})
export class PlacedOrderComponent implements OnInit {

  InvoiceForm = new FormGroup({
    SupplierName : new FormControl('',Validators.required),
    ShipAddress : new FormControl('',Validators.required),
    City : new FormControl('',Validators.required),
    ZipCode : new FormControl('',Validators.required),
    Tax : new FormControl(''),
    SubTotal : new FormControl(''),
    Total : new FormControl('')
  });

  CartItems : any = [];
  IsItemAvailable : any;
  public TotalPrice : number = 0;
  TotalItems : any;
  ItemProductQuantity : number;
  constructor(private service : DataServiceService,private router : Router) { }

  GetProducts(){
    this.service.Get("Home/GetCartItems").subscribe(data=> {
      this.CartItems = data;
      this.IsItemAvailable = this.CartItems?.length;
      this.CartPriceCalculation(this.CartItems);
    },
    error => {
      console.log("Error In response",error);
    });
    
  }

  CartPriceCalculation(data : any){
    let a = this.TotalPrice = 0;
    data.forEach(function(element)  {
      a = a + (element.productPrice * element.productQuantity);
    });
    this.TotalPrice = a;
    this.ItemProductQuantity = data.length;
  }

  Invoice(data : any){
    this.InvoiceForm.patchValue({["SubTotal"] : this.TotalPrice,["Total"] : this.TotalPrice,["ZipCode"] : this.InvoiceForm.value.ZipCode});
    console.log(this.InvoiceForm.value);
    this.service.Post("Invoice/res",this.InvoiceForm.value).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/invoice/" + data.code);
    },
    error =>{
      console.log(error);
    })
  }

  ngOnInit() {
    this.GetProducts();
  }

}
