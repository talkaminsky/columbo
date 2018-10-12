import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  titel: string = "Home"
  constructor(private router: Router) {
    this.router.events.subscribe((res) => { 
      this.titel = this.router.url.substring(1);
    })
  }
  
}
