# Example of CRUD API

Example of a CRUD API done with [Deno](https://deno.land/).

## Links to the tutorials

Traversy Media Tutorials:

- [Deno Crash Course (I)](https://www.youtube.com/watch?v=NHHhiqwcfRM) from
  minute 22 aprox.
- [Deno & PostgreSQL (II)](https://www.youtube.com/watch?v=KuaI6mphFNc)

## Docker

Once installed docker, from the project's root directory run `docker compose up`. This will start to download and install the necessary images for both, postgres and PGAdmin.

## Running the example

```bash
$ docker compose start
# running on watch mode
$ deno run --watch --allow-env --allow-net app.ts excrudapi

# stop the servers
$ docker compose stop
```

---

## ISSUES
