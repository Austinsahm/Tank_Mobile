import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
import { UserInfo } from '../model/user';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

const USER_FIELD = 'user';
const TOKEN_FIELD = 'token';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserInfo>(null);
  private _token = new BehaviorSubject<string>('');
  private _storage: Storage | null = null;

  loggedIn$ = this.loggedIn.asObservable();
  user$ = this.user.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   *   * @param user
   */
  setUser(user: UserInfo) {
    if (!user) {
      return;
    }
    this.user.next(user);
    this._storage.set(USER_FIELD, user);
  }

  setFcmToken(token: string) {    
    this._storage.set(TOKEN_FIELD, token);
    this._token.next(token);
  }

  getFcmToken(): Observable<string> {
    if (this._token.value !== '') return this._token.asObservable();
    return from(this.storage.get(TOKEN_FIELD)).pipe(
      map((token) => {
        if (token) return token;
        return '';
      })
    );
  }

  /**
   * get user data from storage and retun an observable
   */
  get userData(): Observable<UserInfo> {
    return from(this.storage.get(USER_FIELD)).pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      }),
      tap((user) => {
        this.user.next(user);
      })
    );
  }

  //logout
  deleteStorage() {
    return from(this.storage.remove(USER_FIELD)).pipe(
      map(() => {
        this.user.next(null);
      })
    );
  }

  /**
   * initialize ionic storage
   */
  private async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // await this.storage.defineDriver(Drivers.IndexedDB);
    const storage = await this.storage.create();
    this._storage = storage;
  }
}
