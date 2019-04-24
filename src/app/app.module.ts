import {BrowserModule} from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule, MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {RouterModule, Routes} from "@angular/router";
import {LangChangeEvent, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MyProfileComponent} from "./components/myProfile/myProfile.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const appRoutes: Routes = [
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Component({})

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    MyProfileComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  // onLangChange.subscribe((event: LangChangeEvent) => {
  //   // do something
  // });

}
