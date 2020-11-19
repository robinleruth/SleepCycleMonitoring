import { Injectable } from '@angular/core';
import { Entry } from './model/entry';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  entries: Entry[] = [];

  constructor() {
    this.getFromLocalStorage();
   }

  addEntry(entry: Entry): void  {
    this.entries.push(entry);
    this.persistToLocalStorage();
  }

  removeEntry(entry: Entry): void {
    this.entries.splice(this.entries.indexOf(entry), 1);
    this.persistToLocalStorage();
  }

  persistToLocalStorage(): void {
    const stringifiedEntries = this.entries.map(e => JSON.stringify(e.date));
    localStorage.setItem('sleepEntries', JSON.stringify(stringifiedEntries));
  }

  getFromLocalStorage(): void {
    const stringifiedEntries = JSON.parse(localStorage.getItem('sleepEntries')) || [];
    this.entries = stringifiedEntries.map(e => {
        const entry = new Entry();
        entry.date = new Date(JSON.parse(e));
        return entry;
      }
    );
  }
}

