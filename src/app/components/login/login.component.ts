import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public email: String = "";
  public password: String = "";
  public profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28jeQG4eXB8xidrNdqDC02KbHEoFOZ5QyNbnHK_tnM7Ybab1W';

  constructor(private router: Router, private http: HttpClient ) {
  }

  clickMe(){
    this.doLogin().subscribe(
    data => {
      const navExtras: NavigationExtras = {
        state: {
          user: data.user
        }
      };

    this.router.navigate(['myProfile'], navExtras);
    },
    err => console.error(err),
    () => console.log('done register')
    );
  }

  doLogin() {
    let loginUrl = "http://127.0.0.1:8000/api/login/";
    let loginData = {email: this.email, password: this.password};

    console.log(loginData)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(loginUrl, loginData, httpOptions);
  }

  ngOnInit(){}

}
