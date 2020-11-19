import { Component } from '@angular/core';
import { Entry } from '../model/entry';
import { SleepService } from '../sleep.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  entryAdded = false;

  constructor(private sleepService: SleepService) { }

  addEntry(): void {
    const entry = new Entry();
    entry.date = new Date();
    this.sleepService.addEntry(entry);
    this.entryAdded = true;
  }
}
