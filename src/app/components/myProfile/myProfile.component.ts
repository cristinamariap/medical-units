import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.css']
})

export class MyProfileComponent implements OnInit {

  private user;
  //
  // private name = 'Ion';
  // private email = 'ion@gmail.com';
  // private password = 'cevaParolaInteresanta';
  // private diseases = 'raceala, gripa';
  // private profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28jeQG4eXB8xidrNdqDC02KbHEoFOZ5QyNbnHK_tnM7Ybab1W';
  private disa = true;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { user };

    this.user = state.user;

    // this.name = this.user.name;
    // this.email = this.user.email;
  }

  clickMe() {
    this.disa = !this.disa;

    if(this.disa) {
      this.updateUser().subscribe();
    }
  }

  updateUser(){
    let updateUrl = "http://127.0.0.1:8000/api/update/";
    let updateData = {
      id: this.user.id,
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
      profilePic: this.user.profilePic,
      diseases: this.user.diseases

    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.put(updateUrl, updateData, httpOptions);
  }

  ngOnInit() {
  }

}


