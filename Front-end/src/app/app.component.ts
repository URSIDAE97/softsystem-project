import { Component } from '@angular/core';
import { LocalStorageService } from './services/localStorage';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'BTB';
  isActive: boolean;
  key: string = "User id";
  userId: any;
  isAdmin: boolean;
  userRole: any;

  constructor(private localStorageService: LocalStorageService){}


  ngOnInit() {
    this.userId = localStorage.getItem(this.key);

    if(this.userId == null){
      this.isActive = false;
    } else{
      this.isActive = true;
      
      this.localStorageService.getUserRole(this.userId).subscribe(data => { console.log(data);
        this.userRole = data;
    
        if(this.userRole == "admin"){
          this.isAdmin = true;
        } else{
          this.isAdmin = false;
        }
        });
    }
    
  }


  logout(){
    localStorage.setItem(this.key, "");
    this.userId = localStorage.getItem(this.key);
    this.userRole = null;
    window.location.reload();
    localStorage.clear();    
  }
}


