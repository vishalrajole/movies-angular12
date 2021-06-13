import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort!: string | '';
  public movies: Array<Movie> = [];
  private moviesSub: Subscription = new Subscription();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  searchMovies(sort: string, search?: string): void {
    this.moviesSub = this.httpService
      .getMovieList(sort, search)
      .subscribe((gameList: APIResponse<Movie>) => {
        this.movies = gameList.results;
        console.log(gameList, this.moviesSub);
      });
  }
}
