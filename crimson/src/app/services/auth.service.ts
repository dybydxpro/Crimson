import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth 
  ) { }

  async signUp(email: string, password: string): Promise<any> {
    return await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async signIn(email: string, password: string): Promise<any> {
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut(): Promise<any> {
    return await this.firebaseAuth.signOut();
  }
}
