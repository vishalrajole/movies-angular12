import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { sortBy } from 'lodash/fp';
import { APIResponse, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public movies!: Array<Movie>;
  private routeSub!: Subscription;
  private movieSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  // https://image.tmdb.org/t/p/w1400_and_h450_face/
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['movie-search']) {
        this.searchMovies('any', params['movie-search']);
      } else {
        this.searchMovies('any');
      }
    });
  }

  // can be utility function
  sortMovies(movieList: Array<any>, sortByType: string): Array<any> {
    if (sortByType === 'name') {
      return sortBy('title')(movieList);
    } else if (sortByType === 'released') {
      return sortBy('release_date')(movieList);
    } else if (sortByType === 'rating') {
      return sortBy('vote_average', movieList);
    } else {
      return movieList;
    }
  }

  searchMovies(sort: string, search?: string): void {
    this.movieSub = this.httpService
      .getMovieList(sort, search)
      .subscribe((movieList: APIResponse<Movie>) => {
        this.movies = this.sortMovies(movieList.results, sort);

        console.log('movieList', movieList, this.movies);
      });
  }

  goToMovieDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  getBackdropPath(movie: Movie): string {
    return `https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdrop_path}`;
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
