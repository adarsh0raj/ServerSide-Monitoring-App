import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: User;

  constructor(location: Location,  private element: ElementRef, private router: Router,
    private authenticationService: AuthenticationService, private http: HttpClient) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Home';
  }

  logout() {
    this.http.post<any>('http://localhost:3080/user/delnode', {"username": this.user.username}).subscribe(data => {
      console.log(data);
    });

    this.http.post<any>('http://localhost:3080/node/delapp', {}).subscribe(data => {
      console.log(data);
    });

    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
