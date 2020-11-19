import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sleep-cycle-monitoring';
  viewShown = 'main';
  main = 'main';
  plot = 'plot';
  manage = 'manage';

  changeView($event): void {
    this.viewShown = $event;
  }
}

