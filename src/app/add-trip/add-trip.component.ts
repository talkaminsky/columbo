import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.interface';
import { debug } from 'util';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  tempUser: any = {} ;

  constructor(private angularFire: AngularFirestore) { 
    this.usersCollection = angularFire.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {
  }

  addUser(user: User) {
    debugger;
    user.name = "Tal";
    user.userId = "AAAA";
    user.trips = [{name: "Bla"}];
    this.usersCollection.add(user);
  }

}
