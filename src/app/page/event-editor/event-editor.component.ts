import { Event } from 'src/app/model/event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap((params) => this.eventService.get(params['id']))
  )

  onUpdate(event: Event): void {

    this.eventService.update(event).subscribe({
      next: (event) => {
        this.router.navigate(['/', 'event']);
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {}
}
