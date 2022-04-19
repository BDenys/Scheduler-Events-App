import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-layouts',
  templateUrl: './week-layouts.component.html',
  styleUrls: ['./week-layouts.component.scss']
})
export class WeekLayoutsComponent implements OnInit {
  public rows = Array(7).fill('').map((day, index) => index );
  public columns = Array(15).fill('').map((day, index) => index);
  public events: any[] = [];
  public durationHandler = 30;
  selectedDay = {
    x: 0,
    y: 0
  };
  constructor() { }


  ngOnInit(): void {
  }

  selectedDayFunc (row: number, columns: number): void {
    this.selectedDay.x = row;
    this.selectedDay.y = columns;
    this.createEvent();
  }

  createEvent(coordinates?: any) {
    console.log();

    const newEvent = {
      x: this.selectedDay.x,
      y: this.selectedDay.y,
      duration: this.durationHandler,
      description: 'New Event'
    }

    this.events = [...this.events, newEvent];
    console.log(this.events)

  }

}
