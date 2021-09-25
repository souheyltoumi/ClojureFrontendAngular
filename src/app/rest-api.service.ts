import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'http://localhost:3000';
  imageServer = 'http://localhost:8008/image_';
  UserData = null
  constructor(private http: HttpClient) { }
    /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': 'text/plain'      
      
    })
  }
  registerEmployee(username:String,password:String,email:String,file:any): Observable<String>{
    const formData = new FormData(); 
    formData.append("image", file, file.name);
    console.log(formData)
    return this.http.post<String>(this.apiURL + '/register?username='+username.toString()+'&password='+password.toString()+'&email='+email.toString(),formData,{responseType:'json'})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  Login(username:String,password:String): Observable<String>{
    return this.http.get<String>(this.apiURL + '/login?username='+username.toString()+'&password='+password.toString(),{responseType:'json'})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.apiURL+'/photos', formData)
}



  // Error handling 
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }  
}
