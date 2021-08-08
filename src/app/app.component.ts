import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Invoice';

  logout()
  {
    localStorage.clear();
    sessionStorage.clear();
  }
  Isloggedout() : boolean
  {
    if(localStorage.getItem("UserId"))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
