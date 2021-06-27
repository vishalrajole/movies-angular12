import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment as env } from 'src/environments/environment';
import { Movie, APIResponse, MovieDetails } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getMovieList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Movie>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Movie>>(
      `${env.BASE_URL}/trending/all/week`,
      {
        params: params,
      }
    );
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    let params = new HttpParams().set('language', 'en-US');
    const movieDetails = this.http.get<MovieDetails>(
      `${env.BASE_URL}movie/${movieId}`,
      { params }
    );

    // const movieImages = this.http.get<MovieDetails>(
    //   `${env.BASE_URL}movie/${movieId}/images`,
    //   { params }
    // );
    // const movieVideos = this.http.get<MovieDetails>(
    //   `${env.BASE_URL}movie/${movieId}/videos`,
    //   { params }
    // );

    return forkJoin({
      movieDetails,
      // movieImages,
      // movieVideos,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['movieDetails'],
          // images: resp['movieImages'],
          // videos: resp['movieVideos'].results,
        };
      })
    );
  }
}
