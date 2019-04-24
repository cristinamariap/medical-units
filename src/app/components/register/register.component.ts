import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public name: String = "";
  public email: String = "";
  public password: String = "";
  public diseases: String = "";
  public profilePic = "";

  constructor(private router: Router, private  http: HttpClient ) {}

  clickMe(){
    // this.doRegister().subscribe(
    //   data => {
    //     const navExtras: NavigationExtras = {
    //       state: {
    //         user: data.user
    //       }
    //     };
    //
    //     this.router.navigate(['myProfile'], navExtras);
    //   },
    //   err => console.error(err),
    //   () => console.log('done register')
    // );
  }

  // doRegister() {
  //   let registerUrl = "http://127.0.0.1:8000/api/register/";
  //   let registerData = {name: this.name, email: this.email, password: this.password, diseases: this.diseases, profilePic: this.profilePic};
  //
  //   console.log(registerData)
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //     })
  //   };
  //
  //   return this.http.post(registerUrl, registerData, httpOptions);
  // }

  ngOnInit(){}

}
