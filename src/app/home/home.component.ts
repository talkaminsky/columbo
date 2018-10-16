import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Trip } from '../models/trip.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  trips$: Observable<Trip[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { 
    
  }

   ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.trips$  = this.db.collection<Trip>('trips').valueChanges();
      }
    })
  }
}
