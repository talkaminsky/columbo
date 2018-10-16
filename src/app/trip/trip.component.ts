import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../models/trip.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserMetaData } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  private userssCollection: AngularFirestoreCollection<UserMetaData>;

  user: any;
  mainImage: any;

  constructor(private db: AngularFirestore, private dbStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getImage();
    this.getUser();
  }
  
  getUser() {
    let subscription = this.db.collection<UserMetaData>('users', ref => ref.where('userId', '==', this.trip.userId)
    .limit(1)).valueChanges().subscribe(data => {
      this.user = data[0];
      subscription.unsubscribe();
    });
  }

  getImage() {
    let subscription = this.dbStorage.ref(this.trip.photos[0]).getDownloadURL().subscribe(data => {
      this.mainImage = data;
      subscription.unsubscribe();
    });
  }
  
  timeSince(date) {
    let seconds = Math.floor((Date.now() / 1000) - date.seconds);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }


}
