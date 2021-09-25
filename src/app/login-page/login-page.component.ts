import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private RestApi:RestApiService,private router :Router,private CookiesService: CookieService) { }

  ngOnInit(): void {
  }
  Login(username:String,password:String){
    this.RestApi.Login(username,password).subscribe((response:any) =>{
      if('login' in response && response['login']){
        this.CookiesService.set('authToken',response["token"]);
        this.RestApi.UserData = response["userdata"];
        this.router.navigateByUrl('/home');
      }else{
        alert('Login Failed Please check your credentials');
      }
    })
  }

}
