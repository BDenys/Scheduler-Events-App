import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {SharedModule} from "../shared/shared.module";

import { MainLayoutsComponent } from './layouts/main-layouts/main-layouts.component';
import { CalendarLayoutsComponent } from './layouts/calendar-layouts/calendar-layouts.component';
import { DayLayoutsComponent } from './layouts/day-layouts/day-layouts.component';
import { WeekLayoutsComponent } from './layouts/week-layouts/week-layouts.component';
import { MonthLayoutsComponent } from './layouts/month-layouts/month-layouts.component';

const routes: Routes = [
  { path: '', component: MainLayoutsComponent, data: { title: 'main'}, children: [
      { path: '', redirectTo: '/calendar/day', pathMatch: 'full' },
      { path: 'calendar', component: CalendarLayoutsComponent, data: { title: 'calendar'}, children: [
          { path: '', redirectTo: '/day', pathMatch: 'full' },
          { path: 'day', component: DayLayoutsComponent, data: { title: 'day'} },
          { path: 'week', component: WeekLayoutsComponent, data: { title: 'week'} },
          { path: 'month', component: MonthLayoutsComponent, data: { title: 'month'} },
        ]}
    ]}
]

@NgModule({
  declarations: [
    MainLayoutsComponent,
    CalendarLayoutsComponent,
    DayLayoutsComponent,
    WeekLayoutsComponent,
    MonthLayoutsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeatureModule { }
