import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUrl;

  private navLinks = [
    {path : 'myProfile', label : 'MyProfile'},
    {path : 'home', label : 'Home'},
    {path : 'about', label : 'About'},
    {path : 'login', label : 'Login'},
    {path : 'register', label : 'Register'}
  ];

  constructor(private translate: TranslateService, private router:Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.currentUrl = event.url.slice(1);
      }

    });
  }

  clickMe() {
  }

  changeLanguage(lang: string) {
    console.log({lang});
    this.translate.use(lang);
  }
}
