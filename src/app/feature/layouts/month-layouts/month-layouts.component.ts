import {Component, DoCheck, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@Component({
  selector: 'app-month-layouts',
  templateUrl: './month-layouts.component.html',
  styleUrls: ['./month-layouts.component.scss']
})
export class MonthLayoutsComponent implements OnInit {
  staticWeekDays = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  staticWeekDaysShort = ['Пн','Вт','Ср','Чт','Пн','Сб','Вс'];
  calendar!: any[];
  calendar$!: Observable<any>;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.generateCalendar();
    this.calendar$ = this.calendarService.calendar$;

  }

}
