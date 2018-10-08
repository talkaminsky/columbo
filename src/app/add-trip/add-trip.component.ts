import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.interface';
import CountriesCities from  'full-countries-cities';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;

  users: Observable<User[]>;
  tempUser: any = {} ;
  image: any = {};

  allCountries: any = CountriesCities.getCountryNames();
  defaultCountryIndex = 237;
  allCities = CountriesCities.getCities(this.allCountries[this.defaultCountryIndex]);
  tripForm: FormGroup;

  constructor(private angularFire: AngularFirestore, private fb: FormBuilder, private afStorage: AngularFireStorage) { 
    this.usersCollection = angularFire.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {
    this.tripForm = this.fb.group({
      countryControl: new FormControl(),
      cityControl: new FormControl()
    });
  
  }

  countryChanged(e) {
    this.allCities = CountriesCities.getCities(this.tripForm.controls['countryControl'].value);
  }

  setImage(event) {
    this.image = event.target.files[0];
  }

  addUser(user: User) {
    user.name = "Tal";
    user.userId = "123";
    user.trips = ['456']
   
    this.afStorage.upload('/trips/456', this.image).then(x => {
      debugger;
      this.usersCollection.add(user);
    });  
  }

}
