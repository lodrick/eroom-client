import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Advert } from '../models/advert';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private angularFirestore: AngularFirestore) { }

  //=================Advert CRUD=====================

  retieveAdverts() {
    return this.angularFirestore.collection<Advert>("adverts", ref => ref.orderBy('status')).snapshotChanges();
  }

  createAdvert(advert: Advert) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("adverts")
        .add(advert)
        .then(response => {console.log(response)}, error => reject(error));
    });
  }

  // deleteAdvert(advert: Advert){
  //   return this.angularFirestore
  //     .collection("adverts")
  //     .doc(advert.adId)
  //     .delete();
  // }

  updateAdvert(advert: Advert, adId: string) {
    return this.angularFirestore
      .collection("adverts")
      .doc(adId)
      .update({
        
      })
  }
  udateAdvertStatus(adId: string, status: string) {
    return this.angularFirestore.collection("adverts").doc(adId).update({'status': status});
  }

  //====================Users CRUD=====================

  retrieveUsers() {
    return this.angularFirestore.collection<User>("users").snapshotChanges();
  }

  retrieveUsersByUserType(userType: string) {
    return this.angularFirestore.collection<User>("users", ref => ref.where("userType", "==", userType)).snapshotChanges();
  }

  retrieveUserByUserId(userId: string) {
    return this.angularFirestore.collection("users", ref => ref.where('idUser', "==", userId)).valueChanges();
    
  }

  retrieveUsersByDate(date: Date) {
    date.getDate();
    return this.angularFirestore.collection<User>("users", ref => ref.where("createAt", "==", date)).snapshotChanges();
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),

  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      surname: '',
      email: '',
      
    });
  }
}
