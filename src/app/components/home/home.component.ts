import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private unitatiMedicale = [];
  // private unitatiMedicale = [
  //   {
  //     idMed: 0,
  //     nume: 'Spital Pediatrie',
  //     tipUnitate: 'Pediatrie',
  //     locatie: 'Strada Ion Minulescu nr. 56',
  //     sigla: 'data:image/png;base64,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'
  //
  //   },
  //   {
  //     idMed: 1,
  //     nume: 'Spital Chirurgie',
  //     tipUnitate: 'Chirurgie',
  //     locatie: 'Strada Moldovei nr. 10',
  //     sigla: 'https://images1-fabric.practo.com/practices/1152674/sri-hospitals-chennai-598994d2c5812.jpg'
  //   },
  //   {
  //     idMed: 2,
  //     nume: 'Spital Ortopedie',
  //     tipUnitate: 'Ortopedie',
  //     locatie: 'Strada Crizantemelor nr 4 ap. 20 scara IV',
  //     sigla: 'https://t3.ftcdn.net/jpg/01/17/33/50/240_F_117335048_pfa41ygGXkoiy6eTunrThTXECax0mTJR.jpg'
  //   },
  //   {
  //     idMed: 3,
  //     nume: 'Spital Oftamologie',
  //     tipUnitate: 'Oftamologie',
  //     locatie: 'Strada Albinelor nr 129A',
    //     sigla: 'https://i.pinimg.com/originals/81/03/7b/81037bbf1425c5de5972dd5c6eb5f586.gif'
  //   }
  // ]

  constructor(private router: Router, private  http: HttpClient ) {}

  private loadMedicalUnits(){
    return this.http.get('http://127.0.0.1:8000/api/medunits/');
  }

  clickMe(medID){
    for (let i = 0; i < this.unitatiMedicale.length; i++) {
      if (this.unitatiMedicale[i].id === medID) {
        const navExtras: NavigationExtras = {
          state: {
            doctors: this.unitatiMedicale[i].doctors
          }
        };

        this.router.navigate(['about'], navExtras);

        return
      }
    }
  }

  ngOnInit(){
    this.loadMedicalUnits().subscribe(
      response => {
        this.unitatiMedicale = response.data;
      },
      err => console.error(err),
      () => console.log('done loading medical units')
    );
  }

}


