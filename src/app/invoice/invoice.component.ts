import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  LoopData : any = [];
  TableData : any = [];
  Details : any;
  Date = Date.now();
  public TotalPrice : number = 0;
  TotalItems : any;
  ItemProductQuantity : number;
  constructor(private route : ActivatedRoute,private service : DataServiceService) { }

  GetInvoiceData(InvoiceId : any,){
    console.log("Invoice/GetInvoice/" + InvoiceId);
    this.service.Get("Invoice/GetInvoice?InvoiceId=" + InvoiceId).subscribe(data => {
      this.LoopData = data;
      for (let index = 0; index < this.LoopData.length; index++) {
        this.TableData[index] = this.LoopData[index].cartItems;
      }
      this.CartPriceCalculation(this.TableData);
      this.Details = data[0].invoiceDetails; 
      console.log(this.Details);
    },
    error => {
      console.error(error);
    })
  }
  CartPriceCalculation(data : any){
    let a = this.TotalPrice = 0;
    data.forEach(function(element)  {
      a = a + (element.productPrice * element.currentQuantity);
    });
    this.TotalPrice = a;
    this.ItemProductQuantity = data.length;
  }
  ngOnInit() {
    let InvoiceId = this.route.snapshot.paramMap.get("InvoiceId");
    this.GetInvoiceData(InvoiceId);
  }

}
