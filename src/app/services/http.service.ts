import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    return this.http.get<MovieDetails>(`${env.BASE_URL}movie/${movieId}`, {
      params: params,
    });
  }
}
