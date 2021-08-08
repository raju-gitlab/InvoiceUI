import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service : DataServiceService,private route : ActivatedRoute,private router : Router,private formBuilder : FormBuilder,private toasterservice : ToastrService) { }

  CartItems : any = [];
  IsItemAvailable : any;
  public TotalPrice : number = 0;
  TotalItems : any;
  fromarray = new  FormArray([]);
  ItemProductQuantity : number;
  CartItemsFrom = new FormGroup({
    ProductName : new FormControl('Raju',Validators.required),
    ProductType : new FormControl('Raju',Validators.required),
    ProductGuid : new FormControl('Raju',Validators.required),
    ProductImage : new FormControl('Raju',Validators.required),
    ProductQuantity : new FormControl('1',Validators.required),
    ProductbasePrice : new FormControl('3',Validators.required),
  });
  CartItemsFrom2 : FormGroup;
  PostFrom = new FormGroup({
    Value : new FormControl('',Validators.required),
    ProductQuantity : new FormControl('',Validators.required)
  });
  MyFiles:FormGroup[] = []
  GetCartItems(){
    this.service.Get("Home/GetCartItems").subscribe(data=> {
      this.CartItems = data;
      console.log(data);
      console.log(typeof(data));
      this.IsItemAvailable = this.CartItems?.length;
      this.CartPriceCalculation(this.CartItems);
    },
    error => {
      console.log("Error In response",error);
    });
  }

  RemoveFromCart(data : any){
    if(!confirm("Are you sure you want to delete current item")) return;
    this.service.Delete("Home/DeleteFromCart?ProductId=" + data).subscribe(data => {
      this.GetCartItems();
    },
    error =>{
      console.log("error in response",error);
    })
  }
  IncreeseCartItems(data : any){
    this.PostFrom.patchValue({["Value"] : data,["ProductQuantity"] : 1});
    this.service.Post("Home/IncreaseCartItems",this.PostFrom.value).subscribe(data=>{
      this.toasterservice.success("Success","Product Updated");
      this.GetCartItems();
    },
    error=>{
      this.toasterservice.error("Failed","Product not Updated");
      console.error("error in response",error);
    });
  }
  DecreaseCartItems(data : any){
    this.PostFrom.patchValue({["Value"] : data,["ProductQuantity"] : 1});
    this.service.Post("Home/DecreaseCartItems",this.PostFrom.value).subscribe(data=>{
      this.GetCartItems();
    },
    error=>{
      console.error("error in response",error);
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
  ViewItems()
  {
    for(let items = 0; items < this.CartItems.length ; items++){
      this.MyFiles.push(this.CartItems[items]);
    }
    console.log(this.MyFiles);
    this.service.Post(this.CartItemsFrom.value,"Order/CartProducts").subscribe(data =>{
      console.log("OK");
    },
    error =>{
      console.error(error);
    });
  }
  ngOnInit() {
    this.GetCartItems();
  }
}
