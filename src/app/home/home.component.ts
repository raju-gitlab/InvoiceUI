import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Products : any = [];
  constructor(private DataService : DataServiceService ) { 
    this.getProducts();
  }

  getProducts(){
    this.DataService.Get("Home/products").subscribe(data => {
      this.Products = data;
      console.log(data);
    },
    error => {
      console.error("error in resposne");
    });
  }

  ngOnInit(): void {
  }

}
