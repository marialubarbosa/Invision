import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private notifications: NotificationsService
  ) {

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

   }

   SingIn(email, password) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then((result) => {
       this.ngZone.run(() => {
         this.router.navigate(['user-space'])
       });
       this.SetUserData(result.user);
       return result
     }).catch((error) => {
       return error
     })
   }

   SingUp(email, password){
     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((result) => {
       this.SetUserData(result.user);
       this.router.navigate(['user-space'])
       return result.user
     }).catch((error) => {
       return error
     })
   }

   ForgotPassword(passwordResetEmail) {
     return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
     .then((e) => {
      return e
     })
   }


   get isLoggedIn(): boolean {
     const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null ? true : false);
   }

   GoogleAuth() {
     return this.AuthLogin(new auth.GoogleAuthProvider());
   }


   AuthLogin(provider) {
     return this.afAuth.auth.signInWithPopup(provider)
     .then((result) => {
       this.ngZone.run(() => {
         this.router.navigate(['user-space'])
       })
       this.SetUserData(result.user)
     }).catch((error) => {
       console.log(error)
       this.router.navigate(['user-space'])
        return error
     })
   }

   SetUserData(user) {
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
     const userData: User = {
       uid: user.uid,
       email: user.email,
       displayName: "user.displayName",
       photoUrl: user.photoUrl,
       emailVerified: user.emailVerified
     }

     return userRef.set(userData, {
       merge: true
     })
   }

   SingOut() {
     return this.afAuth.auth.signOut()
     .then((result) => {
       localStorage.removeItem('user');
       this.router.navigate([''])
     })
   }

   getImages(){
     return [
      "../../../../assets/img_carousel.png",
      "../../../../assets/img_carousel.png",
      "../../../../assets/img_carousel.png"
    ]
   }
}
