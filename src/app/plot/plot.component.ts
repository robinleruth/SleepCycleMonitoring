import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Label } from 'ng2-charts/lib/base-chart.directive';
import { Color } from 'ng2-charts/public_api';
import { SleepService } from '../sleep.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  freqMap: Map<string, number> = new Map();

  lineChartLegend = true;
  lineChartPlugins = [];

  sleepEntryData: ChartDataSets[] = [
    { data: [], label: 'Occurences', fill: false }
  ];
  sleepEntryChartType = 'line';
  sleepEntryLabels: Label[] = []; // update in real time

  sleepEntryColors: Color[] = [
      {
        borderColor: '#039BE5',
        pointBackgroundColor: '#039BE5'
      }
  ];

  /* and then options example : */
  sleepEntryOptions: ChartOptions = {
      animation: {
        duration: 0
      },
      responsive: true,
      scales: {

        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              if (Number.isInteger(value)) {
                return value;
              }
            }
          }
        }]
      }
   };
  constructor(private sleepService: SleepService) { }

  ngOnInit(): void {
    this.initFreqMap();
    this.transformAndApplyData();
  }

  initFreqMap(): void {
    const x = 1; // minutes interval
    let tt = 0; // start time

    // loop to increment the time and push results in array
    for (let i = 0 ; tt < 24 * 60 ; i++) {
      const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      const mm = (tt % 60); // getting minutes of the hour in 0-55 format
      // times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) ; // pushing data in array in [00:00 - 12:00 AM/PM format]
      this.freqMap.set(('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2), 0);
      tt = tt + x;
    }
  }

  transformAndApplyData(): void {
    const timeArray = this.sleepService.entries.map(e => {
      const h = e.date.getHours().toString();
      const m = e.date.getMinutes().toString();
      const hh = h.length === 1 ? '0' + h : h;
      const mm = m.length === 1 ? '0' + m : m;
      return hh + ':' + mm;
    });
    timeArray.forEach(t => {
      let count = this.freqMap.get(t);
      this.freqMap.set(t, ++count);
    });
    const temp = this.movingAvg([...this.freqMap.values()], 10).map(x => x * 10);
    this.sleepEntryLabels = [...this.freqMap.keys()];
    // this.sleepEntryData[0].data = [...this.freqMap.values()];
    this.sleepEntryData[0].data = temp;
  }

  /**
   * returns an array with moving average of the input array
   * @param array - the input array
   * @param count - the number of elements to include in the moving average calculation
   * @param qualifier - an optional function that will be called on each
   *  value to determine whether it should be used
   */
   movingAvg(array, count, qualifier?): any[] {

    // calculate average for subarray
    const avg = (array, qualifier) => {
      let sum = 0;
      let ct = 0;
      let value = 0;
      // tslint:disable-next-line: forin
      for (const i in array) {
        value = array[i];
        if (!qualifier || qualifier(value)) {
          sum += value;
          ct++;
        }
      }
      return sum / count;
    };

    const result = [];
    let val;

    // pad beginning of result with null/0 values
    for (let i = 0; i < count - 1; i++) {
        result.push(0);
    }

    // calculate average for each subarray and add to result
    for (let  i = 0, len = array.length - count; i <= len; i++){

        val = avg(array.slice(i, i + count), qualifier);
        if (isNaN(val)) {
          result.push(null);
        }
        else {
          result.push(val);
        }
    }
    return result;
  }
}
