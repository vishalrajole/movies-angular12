import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, MovieDetails } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  movieRating = 0;
  gameId!: string;
  // movieGaugeLabel: any;
  public movie!: MovieDetails;
  private routeSub!: Subscription;
  private movieSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.fetchMovieDetails(this.gameId);
    });
  }

  fetchMovieDetails(movieId: string): void {
    this.movieSub = this.httpService
      .getMovieDetails(movieId)
      .subscribe((movie: MovieDetails) => {
        this.movie = movie;

        setTimeout(() => {
          this.movieRating = this.movie.vote_average;
        }, 1000);

        console.log('movie details', movie);
      });
  }

  renderGaugeLabel = (): string => {
    return this.movieRating.toString();
  };

  getBackdropPath(movie: MovieDetails): string {
    return `https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdrop_path}`;
  }

  getColor(value: number): string {
    if (value > 7.5) {
      return '#5ee432';
    } else if (value > 5.0) {
      return '#fffa50';
    } else if (value > 3.0) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
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
