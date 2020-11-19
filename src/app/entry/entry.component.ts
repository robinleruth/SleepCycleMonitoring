import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Entry } from '../model/entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

  @Input() entry: Entry;
  @Output() deleteEntry = new EventEmitter();

  constructor() { }

  delete(): void {
    this.deleteEntry.emit(this.entry);
  }
}
