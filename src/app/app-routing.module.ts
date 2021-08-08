import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PlacedOrderComponent } from './placed-order/placed-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:"cart",component:CartComponent},
  {path:"home",component:HomeComponent},
  {path:"invoice/:InvoiceId",component:InvoiceComponent},
  {path:"PlacedOrder",component:PlacedOrderComponent},
  {path:"ProductDetails/:ProductId",component:ProductDetailsComponent},
  {path:"Login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
