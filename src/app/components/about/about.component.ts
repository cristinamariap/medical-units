import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forEach} from "@angular/router/src/utils/collection";
import {getAllDebugNodes} from "@angular/core/src/debug/debug_node";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  private doctorsToShow = [];

  private medList ;
    // = [
  //   {
  //     idMed: 0,
  //     doctors: [
  //       {
  //         name: 'Popescu',
  //         prenume: 'Ion',
  //         specializare: 'pediatru',
  //         an: 1995,
  //         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xm1JzrlV90NlM0va5bKL0a7-6i02AuVMqgK2BBNhkbBvwvAq'
  //       },
  //       {
  //         name: 'Ionescu',
  //         prenume: 'Vasile',
  //         specializare: 'pediatru- rezident',
  //         an: 2015,
  //         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-W6JcarfoYnaRWYWsvi1CV-Zx_UI9ED7nhwyGQU1Yc1R3jzEZ'
  //       }
  //     ]
  //   },
  //   {
  //     idMed: 1,
  //     doctors: [
  //       {
  //         name: 'Dumitrascu',
  //         prenume: 'Dumitru',
  //         specializare: 'chirurg',
  //         an: 2001,
  //         img: 'https://image.freepik.com/fotos-gratis/doutor-de-sorriso-com-estetoscopio_1154-36.jpg'
  //       },
  //       {
  //         name: 'Moldovan',
  //         prenume: 'Maria',
  //         specializare: 'chirurg',
  //         an: 2015,
  //         img: 'https://media.gettyimages.com/photos/female-doctor-picture-id465124678?s=612x612'
  //       }
  //     ]
  //   },
  //   {
  //     idMed: 2,
  //     doctors: [
  //       {
  //         name: 'Constantinescu',
  //         prenume: 'Andrei',
  //         specializare: 'ortoped',
  //         an: 2011,
  //         img: 'data:image/jpeg;base64,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'
  //       },
  //       {
  //         name: 'Iosif',
  //         prenume: 'Radu',
  //         specializare: 'ortoped',
  //         an: 2013,
  //         img: 'https://www.wellnesshour.com/wp-content/uploads/2014/11/doctor-profile-02.jpg'
  //       }
  //
  //
  //     ]
  //   },
  //
  //   {
  //     idMed: 3,
  //     doctors: [
  //       {
  //         name: 'Iliescu',
  //         prenume: 'Anca',
  //         specializare: 'oftamolog',
  //         an: 2007,
  //         img: 'http://jaybabani.com/ultra-admin-html/preview/data/doctors/doctor-1.jpg'
  //       }
  //     ]
  //   }
  // ];

  constructor(private router: Router, private  http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { doctors };

    this.doctorsToShow = state.doctors;
  }

  ngOnInit() {}

}
