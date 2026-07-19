# Movies Hub

IMDB-like movie browsing and list management app, built with Next.js App Router. Backend: [movie-listing-api](https://github.com/merthelva/movie-listing-api).

**Live:** [movies-hub.space/en](https://movies-hub.space/en)

## Public Features

No account needed:

- Browse home page — now playing, popular, top rated, upcoming
- Browse movies by category (paginated)
- Search movies
- View movie details and cast
- Login / register

## Authenticated Features

Requires login:

- Manage profile — view, update, delete account
- Create, edit, delete watchlists and favorite lists
- Add or remove movies from lists
- Rate movies

**Note:** Attempting an authenticated action while logged out opens the dialog which states authentication is required first.
