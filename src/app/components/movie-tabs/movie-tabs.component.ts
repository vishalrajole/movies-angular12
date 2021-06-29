import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/models';

@Component({
  selector: 'app-movie-tabs',
  templateUrl: './movie-tabs.component.html',
  styleUrls: ['./movie-tabs.component.scss'],
})
export class MovieTabsComponent implements OnInit {
  @Input() movie: MovieDetails | undefined;

  constructor() {}

  ngOnInit(): void {}
}
