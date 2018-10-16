declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.interface';
import CountriesCities from  'full-countries-cities';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  @Input() userId: string;
  private tripsCollection: AngularFirestoreCollection<Trip>;

  tripImages: any = [];
  allCountries: any = CountriesCities.getCountryNames();
  allCities: any = [];
  selectedCountry: string = 'Country';
  tripForm: FormGroup;
  submitted:boolean = false;
  imageId: number = 0;

  constructor(private angularFire: AngularFirestore, 
    private fb: FormBuilder,
    private dbStorage: AngularFireStorage) { 
    this.tripsCollection = angularFire.collection<Trip>('trips');
    this.allCountries.unshift('Country');
  }

  ngOnInit() {
    this.initImages();
    this.tripForm = this.fb.group({
      titleControl: ['', Validators.required],
      storyControl: new FormControl(),
      countryControl: ['', Validators.required],
      cityControl: new FormControl()
    });
  
  }

  get form() { return this.tripForm.controls; }

  countryChanged(e) {
    this.selectedCountry = this.tripForm.controls.countryControl.value;
    this.allCities = CountriesCities.getCities(this.selectedCountry);
  }

  shouldShowCities() {
    return this.selectedCountry !== 'Country';
  }

  addTrip() {
    this.submitted = true;

    if (this.tripForm.invalid) return;

    let trip = {
       userId: this.userId,
       title: this.tripForm.controls.titleControl.value,
       story: this.tripForm.controls.storyControl.value,
       country: this.tripForm.controls.countryControl.value,
       city: this.tripForm.controls.cityControl.value,
       coordinates: {
        latitude: 0,
        longitude: 0
       },
       photos: [],
       creationDate: new Date(),
       updateDate: new Date(),
       likes: []
    } ;

    let imagesUplodes = [];
    trip.photos = [];
    this.tripImages.forEach(image => {

      imagesUplodes.push(new Promise((resolve) => {
        this.dbStorage.upload('/trips/' + this.userId +'/' + new Date().getTime(), image).then(upload => {
          trip.photos.push(upload.metadata.fullPath);
          resolve();
        });
      }));

    });

    Promise.all(imagesUplodes).then(() => this.tripsCollection.add(trip));
  }

  initImages() {
    var button = $('.trip-images .pic')
    var uploader = $('<input type="file" accept="image/*" />')
    var images = $('.trip-images')
    
    button.on('click', () => uploader.click());
    
    uploader.on('change', () => {
        var reader = new FileReader();
        var imageFile = uploader[0]['files'][0];
        this.tripImages.push(imageFile);
        reader.readAsDataURL(imageFile);
        button.hide();

        if(this.tripImages.length < 8) {
          button.show();
        }

        reader.onload = (event) => {
          var image = event['target']['result'];
          images.prepend('<div class="img" style="background-image: url(\'' 
          + image + '\');" rel="'+ image  +'"><span id="' 
          + this.imageId + '" class="remove" (click)="removeImage($event)">x</span></div>');
         
          this.imageId++;
        }
     });
    
    images.on('click', '.remove', (target) => {
        var currentImage = parseInt(target.toElement.id);
        this.tripImages.splice(currentImage, 1);
        $(target.toElement).parent().remove();
        this.imageId--;

        if(this.tripImages.length < 8) {
          button.show();
        }
    });
  }

}
