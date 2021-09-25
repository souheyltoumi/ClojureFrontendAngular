import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userData:any;
  imageSrc:any;
  constructor(private cookieService:CookieService,private router:Router,private restApi:RestApiService) { }

  ngOnInit(): void {
    if(!this.cookieService.get( 'authToken')){
      this.router.navigateByUrl('/login');
    }
    this.userData =  this.restApi.UserData;
    this.imageSrc = this.restApi.imageServer +this.cookieService.get( 'authToken')+".jpeg";
  }
  Logout(){
    this.cookieService.delete( 'authToken');
    this.router.navigateByUrl('/login');
  }
}
