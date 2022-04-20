import { Component, OnInit } from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CalendarService} from "../../services/calendar.service";

@UntilDestroy()
@Component({
  selector: 'app-week-layouts',
  templateUrl: './week-layouts.component.html',
  styleUrls: ['./week-layouts.component.scss']
})
export class WeekLayoutsComponent implements OnInit {

  public rows = Array(7).fill('').map((day, index) => index );
  public columns = Array(15).fill('').map((day, index) => index);

  staticDaysOfWeek = [
    ['01', '02', '03', '04', '05', '06', '07'],
    ['08', '09', '10', '11', '12', '13', '14'],
    ['15', '16', '17', '18', '19', '20', '21'],
    ['22', '23', '24', '25', '26', '28', '29'],
    ['30','31']
  ];

  public events: any[] = [];
  public durationHandler = 30;
  currenDayOnWeek!: number;
  selectedDay = {
    x: 0,
    y: 0
  };

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.currenDayOnWeek
      .pipe(untilDestroyed(this))
      .subscribe(currenDayOnWeek => {
        this.currenDayOnWeek = currenDayOnWeek;
      })
  }

  selectedDayFunc (row: number, columns: number): void {
    this.selectedDay.x = row;
    this.selectedDay.y = columns;
    this.createEvent();
  }

  createEvent(coordinates?: any) {

    const newEvent = {
      x: this.selectedDay.x,
      y: this.selectedDay.y,
      duration: this.durationHandler,
      description: 'New Event'
    }

    this.events = [...this.events, newEvent];

  }

}
