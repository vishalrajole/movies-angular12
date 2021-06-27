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
  public gameId: string;
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

        console.log('movie details', movie);
      });
  }

  getBackdropPath(movie: MovieDetails): string {
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
