# visable-cc

This is my submission (Bruno Teixeira) to the Visable code challenge for Senior Frontend Engineer.

### Notes

- I had **absolutely no experience** with either Vue, Nuxt or Vitest before this code challenge. Although I enjoyed the learning experience, much of my time was spent on learning and therefore some things are left as improvements, described below.
- The exposed NASA API doesn't support pagination; additionally, their listing endpoint only returns a list of IDs. This means there is no way of rendering a list without triggering the details endpoint for each listed project at some point.
  - My current implementation naively calls those endpoints everytime data is requested. This worked better than I expected since the TechPort API responds very fast even for pages of 50 elements. Also, in contradiction to their docs, they don't seem to limit the number of requests per IP address. I signed up for an API Key but didn't use it because the documentation doesn't say how.
  - Possible ways to improve this approach include:
    - Caching the NASA responses for a period between 1h and 1 day, since they don't seem to change often
    - Smart caching of the project list based on date comparison (newer "last updated" parameters will include the same projects as older ones)
    - "Warm-up" pre-fetching of data in the background as soon as the server starts.
  - Unfortunately I didn't have time to figure out the best way to do this with a Nuxt app. It's possible that a simple `Map`-based cache would work well enough, which would already be an improvement. I expected the NASA calls to be cached somewhere out of the box according to the Nuxt docs for `useFetch()`, but that doesn't seem to happen.
- In a similar way, I spent quite some time figuring out how to successfully run unit/component tests with Vitest+Nuxt. I ended up only writing a couple of basic unit tests. I do think they are a good base because they show how to mount components in a headless environment, check for text and classes in elements, and mock API calls with dumped data from the NASA API.

### Deliverable
- A Nuxt app created by their CLI initializer
- TypeScript everywhere
- Vuetify as a UI library
- Vitest for testing

### Architecture and Design
There is a local API (`/server` folder) that exposes two endpoints. It can provide a list of projects with their details (crossing the two NASA endpoints described above), and it can provide the details for a single project.

Both the listing page and details page are rendered on the server on first request. Subsequent navigations will render directly in the browser.

The listing page contains an area for widgets which lets the user select the "updated since" parameter, the current page, and the pagination size. All parameters are reflected in the URL so that links can be shared and data persists between refreshes.

Both pages make use of the responsive grid in Vuetify and should display well in all breakpoints.

### Running
Running the local development server:
```bash
$ npm run dev
```

Running tests:
```bash
$ npm run test
```