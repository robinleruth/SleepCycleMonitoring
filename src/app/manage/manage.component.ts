import { Component, OnInit } from '@angular/core';
import { SleepService } from '../sleep.service';
import { Entry } from '../model/entry';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  hour: number;
  minute: number;
  date: string;

  constructor(public sleepService: SleepService) { }

  ngOnInit(): void {
    console.log('init manage component');
  }

  deleteEntryFromService(e: Entry): void {
    this.sleepService.removeEntry(e);
  }

  addTime(): void {
    const entry = new Entry();
    const newDate = new Date(this.date);
    newDate.setHours(this.hour);
    newDate.setMinutes(this.minute);
    entry.date = newDate;
    this.sleepService.addEntry(entry);
  }
}
