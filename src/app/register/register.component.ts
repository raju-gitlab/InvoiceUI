import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  LoginForm = new FormGroup({
    Email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });
  constructor(private service : DataServiceService,private route : Router,private toastservice : ToastrService) { }

  Register(){
    this.service.Post("Home/AddUser",this.LoginForm.value).subscribe(data => {
      this.route.navigateByUrl("/Home");
      this.toastservice.success("Login success","success");
    },
    error => {
      console.error("error in response",error);
    })
  }
  ngOnInit(): void {
  }

}
