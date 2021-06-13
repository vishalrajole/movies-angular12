import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort!: string;
  public movies!: Array<Movie>;
  private routeSub!: Subscription;
  private movieSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovies('any', params['movie-search']);
      } else {
        this.searchMovies('any');
      }
    });
  }

  searchMovies(sort: string, search?: string): void {
    this.movieSub = this.httpService
      .getMovieList(sort, search)
      .subscribe((gameList: APIResponse<Movie>) => {
        this.movies = gameList.results;
        console.log(gameList);
      });
  }

  goToMovieDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
