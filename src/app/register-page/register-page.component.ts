import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})


export class RegisterPageComponent implements OnInit {
    // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file  
  constructor(private RestApi: RestApiService,private cookieService:CookieService ,private router:Router) { }


  ngOnInit(): void {
  }


    // On file Select
    onChange(event:any) {
      this.file = event.target.files[0];
      console.log(this.file)
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
  }

  Register(username:String,password:String,email:String){
    this.RestApi.registerEmployee(username,password,email,this.file).subscribe((response: any) => {
      if('login' in response && response['login'] == true){
        this.cookieService.set( 'authToken', response['token'] );
        this.RestApi.UserData = response["userdata"];
        this.router.navigateByUrl('/home');
      }else{
        alert(response)
      }
    })
  }
}
