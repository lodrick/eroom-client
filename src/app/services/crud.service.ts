import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Advert } from '../models/advert';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private angularFirestore: AngularFirestore) { }



  // getAdvert(id: string){
  //   return this.angularFirestore
  //     .collection("adverts")
  //     .doc(id)
  //     .valueChanges();
  // }

  //=================Advert CRUD=====================

  retieveAdverts() {
    return this.angularFirestore.collection<Advert>("adverts").snapshotChanges();
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

  retrieveUsersByDate(date: Date) {
    date.getDate();
    return this.angularFirestore.collection<User>("users", ref => ref.where("createAt", "==", date)).snapshotChanges();
  }
}
