declare var $: any;

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
  allCities: any = [];
  selectedCountry: string = 'Country';
  tripForm: FormGroup;

  constructor(private angularFire: AngularFirestore, private fb: FormBuilder, private afStorage: AngularFireStorage) { 
    this.usersCollection = angularFire.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    this.allCountries.unshift('Country');
  }

  ngOnInit() {
    this.initImages();
    this.tripForm = this.fb.group({
      countryControl: new FormControl(),
      cityControl: new FormControl()
    });
  
  }

  countryChanged(e) {
    this.selectedCountry = this.tripForm.controls['countryControl'].value;
    this.allCities = CountriesCities.getCities(this.selectedCountry);
  }

  setImage(event) {
    this.image = event.target.files[0];
  }

  shouldShowCities() {
    return this.selectedCountry !== 'Country';
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

  initImages() {
    var button = $('.trip-images .pic')
    var uploader = $('<input type="file" accept="image/*" />')
    var images = $('.trip-images')
    
    button.on('click', function () {
      uploader.click()
    })
    
    uploader.on('change', function () {
        var reader = new FileReader()
        reader.onload = function(event) {
          images.prepend('<div class="img" style="background-image: url(\'' 
          + event['target']['result'] + '\');" rel="'
          + event['target']['result']  +'"><span>remove</span></div>')
        }
        reader.readAsDataURL(uploader[0]['files'][0])

     })
    
    images.on('click', '.img', function () {
      $(this).remove()
    })
  
  }

}
