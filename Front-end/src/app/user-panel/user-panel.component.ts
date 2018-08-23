import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserPanelService } from '../services/user-panel.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Md5} from 'ts-md5';
import { AppComponent } from '../app.component';
import { Router } from '../../../node_modules/@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {


  //current password
  currentPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
  matcherCurrentPassword = new MyErrorStateMatcher();
  //password
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
  ]);
  matcherPassword = new MyErrorStateMatcher();
  //confirm password
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcherConfirmPassword = new MyErrorStateMatcher();

  user: User = {id: 0, login: "", firstName: "", lastName: "", email: "", password: ""};
  key: string = "User id";
  currentUser: number;
  currentPassword: any;
  password: any;
  account: number[]= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  chance: number=0.0;
  dataSourceGraph: Object;
  dataSourceHistory: Object;
  panelOpenGraph: boolean = false;
  panelOpenHistory: boolean = false;


  constructor(private userPanelService: UserPanelService, private logout: AppComponent, private router: Router) { 
  }

  ngOnInit() {
    this.currentUser = Number(localStorage.getItem(this.key));
    this.userPanelService.getUserById(this.currentUser).subscribe(data => {
        this.user = data;
      });
    this.userPanelService.getAccount(this.currentUser).subscribe(data => {
        this.account = data;
        if((this.account[4]+this.account[5])>=4.0)
          this.chance = (this.account[4]/(this.account[4]+this.account[5]))*100;
        else
          this.chance = 50.0;
          this.dataSourceGraph = {
            "chart": {
              "caption": "Szanse wygranej w kolejnym zakładzie",
              "lowerlimit": "0",
              "upperlimit": "100",
              "showvalue": "5",
              "numbersuffix": "%",
              "theme": "candy",
              "showtooltip": "0"
            },
            "colorrange": {
              "color": [
                {
                  "minvalue": "0",
                  "maxvalue": "33",
                  "code": "#F2726F"
                },
                {
                  "minvalue": "33",
                  "maxvalue": "66",
                  "code": "#FFC533"
                },
                {
                  "minvalue": "66",
                  "maxvalue": "100",
                  "code": "#62B58F"
                }
              ]
            },
            "dials": {
              "dial": [
                {
                  "value": this.chance
                }
              ]
            }
          }; 
      });
  }

  save(){
    this.currentPassword = Md5.hashStr(this.currentPasswordFormControl.value);
    this.password = Md5.hashStr(this.passwordFormControl.value);
    if(this.currentPasswordFormControl.errors==null && this.passwordFormControl.errors==null && this.confirmPasswordFormControl.errors==null)
      this.userPanelService.changePassword(this.user.id, this.currentPassword, this.password).subscribe(data => {
        if(data){
          alert("Brawo, hasło zostało zmienione!\nZaloguj się ponownie przy użyciu nowego hasła.");
          this.logout.logout();
          this.router.navigate(['/login']);
        }
        else {
          alert("Podałeś błędne dane!");
        }
      });
  }

  getHistory(){
    this.userPanelService.getAccount(this.currentUser).subscribe(data => {

      this.dataSourceHistory = {
        "chart": {
          "caption": "Twoja oś czasu",
          "yaxisname": "",
          "subcaption": "2018",
          "showhovereffect": "1",
          "numbersuffix": "PLN",
          "drawcrossline": "1",
          "plottooltext": "<b>$dataValue</b> of youth were on $seriesName",
          "theme": "fusion"
        },
        "categories": [
          {
            "category": [{"label": "I"},{"label": "II"},{"label": "III"},{"label": "IV"},{"label": "V"},{"label": "VI"},{"label": "VII"},{"label": "VIII"},{"label": "IX"},{"label": "X"},{"label": "XI"},{"label": "XII"},]
          }
        ],
        "dataset": [
          {
            "seriesname": "Zysk",
            "data": [
              {
                "value": "62"
              },
              {
                "value": "64"
              },
              {
                "value": "64"
              },
              {
                "value": "66"
              },
              {
                "value": "78"
              }
            ]
          },
          {
            "seriesname": "Strata",
            "data": [
              {
                "value": "16"
              },
              {
                "value": "-28"
              },
              {
                "value": "34"
              },
              {
                "value": "42"
              },
              {
                "value": "54"
              }
            ]
          },
          {
            "seriesname": "Saldo",
            "data": [
              {
                "value": "20"
              },
              {
                "value": "22"
              },
              {
                "value": "27"
              },
              {
                "value": "22"
              },
              {
                "value": "29"
              }
            ]
          },
          {
            "seriesname": "Twitter",
            "data": [
              {
                "value": "18"
              },
              {
                "value": "19"
              },
              {
                "value": "21"
              },
              {
                "value": "21"
              },
              {
                "value": "24"
              }
            ]
          }
        ]
    }
    });
  }

}