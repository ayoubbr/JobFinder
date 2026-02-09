import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUserData(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  getUserData(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting data from local storage', error);
      return null;
    }
  }


  removeUserData(key: string): void {
    localStorage.removeItem(key);
  }

  clearAllStorage(): void {
    localStorage.clear();
  }
}
