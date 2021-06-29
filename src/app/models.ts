export interface APIResponse<T> {
  results: Array<T>;
}

export interface Movie {
  backdrop_path: string;
  genres: Array<Genres>;
  id: string;
  overview: string;
  release_date: string;
  vote_average: number;
  title: string;
  name: string;
  original_language: string;
}

export interface MovieDetails {
  backdrop_path: string;
  poster_path: string;
  genres: Array<Genres>;
  id: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  title: string;
  name: string;
  original_language: string;
  budget: number;
  revenue: number;
  runtime: number;
  images: Images;
  videos: Array<Videos>;
}

interface Genres {
  id: string;
  name: string;
}

interface Images {
  id: string;
  backdrops: Array<any>;
  posters: Array<any>; // todo fix this
}

interface Videos {
  data: {
    name: string;
    type: string;
    site: string;
    id: string;
  };
}

//   adult: false;
//   backdrop_path: '/qi6Edc1OPcyENecGtz8TF0DUr9e.jpg';
//   belongs_to_collection: {
//     id: 313086;
//     name: 'The Conjuring Collection';
//     poster_path: '/z5VKhNSQKQyxm0co68HAkCqHnmX.jpg';
//     backdrop_path: '/kHZaX0vuhZdbuq0WKU3BpA9WIQ0.jpg';
//   };
//   budget: 39000000;
//   genres: [
//     { id: 27; name: 'Horror' },
//     { id: 9648; name: 'Mystery' },
//     { id: 53; name: 'Thriller' }
//   ];
//   homepage: 'http://www.theconjuringmovie.net';
//   id: 423108;
//   imdb_id: 'tt7069210';
//   original_language: 'en';
//   original_title: 'The Conjuring: The Devil Made Me Do It';
//   overview: "Paranormal investigators Ed and Lorraine Warren encounter what would become one of the most sensational cases from their files. The fight for the soul of a young boy takes them beyond anything they'd ever seen before, to mark the first time in U.S. history that a murder suspect would claim demonic possession as a defense.";
//   popularity: 4432.301;
//   poster_path: '/xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg';
//   production_companies: [
//     {
//       id: 12;
//       logo_path: '/iaYpEp3LQmb8AfAtmTvpqd4149c.png';
//       name: 'New Line Cinema';
//       origin_country: 'US';
//     },
//     {
//       id: 11565;
//       logo_path: null;
//       name: 'The Safran Company';
//       origin_country: 'US';
//     },
//     {
//       id: 76907;
//       logo_path: '/wChlWsVgwSd4ZWxTIm8PTEcaESz.png';
//       name: 'Atomic Monster';
//       origin_country: 'US';
//     },
//     {
//       id: 174;
//       logo_path: '/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png';
//       name: 'Warner Bros. Pictures';
//       origin_country: 'US';
//     }
//   ];
//   production_countries: [
//     { iso_3166_1: 'US'; name: 'United States of America' }
//   ];
//   release_date: '2021-05-25';
//   revenue: 67551425;
//   runtime: 111;
//   spoken_languages: [
//     { english_name: 'English'; iso_639_1: 'en'; name: 'English' },
//     { english_name: 'Portuguese'; iso_639_1: 'pt'; name: 'Português' }
//   ];
//   status: 'Released';
//   tagline: 'The demonic case that shocked America.';
//   title: 'The Conjuring: The Devil Made Me Do It';
//   video: false;
//   vote_average: 8.3;
//   vote_count: 1792;
