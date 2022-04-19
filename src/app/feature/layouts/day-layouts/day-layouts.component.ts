import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-layouts',
  templateUrl: './day-layouts.component.html',
  styleUrls: ['./day-layouts.component.scss']
})
export class DayLayoutsComponent implements OnInit {
  columns = Array(16).fill('').map((day, index) => index);

  constructor() { }

  ngOnInit(): void {
  }

  events = [
    {
      x: 0,
      y: 0,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 1,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 2,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 3,
      "duration": 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 4,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 5,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 6,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 7,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 8,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 9,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 10,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 11,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 12,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 13,
      duration: 30,
      description: "New Event"
    },
    {
      x: 0,
      y: 14,
      duration: 30,
      description: "New Event"
    }
  ]

}
