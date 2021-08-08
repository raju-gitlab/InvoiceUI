import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  LoginForm = new FormGroup({
    Email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });
  constructor(private service : DataServiceService,private route : Router,private toastservice : ToastrService) { }

  Login(){
    this.service.LoginPost("Home/Login",this.LoginForm.value).subscribe(data => {
      localStorage.setItem("UserId",data.userId);
      localStorage.setItem("Email",data.email);
      this.route.navigateByUrl("home");
      this.toastservice.success("Login success","success");
    },
    error => {
      console.error("error in response",error);
    })
  }
  LogOut(){
    console.log("Pressed....");
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnInit() {
  }

}
