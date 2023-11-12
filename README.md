# sqlite-wasm-demo
A little demo of sqlite-wasm running in node and browser

## Running in node

```
node node.js
```

Should give you something like this:

```
Running demo on main thread.
sqlite3 version 3.44.0 2023-11-01 11:23:50 17129ba1ff7f0daf37100ee82d507aef7827cf38de1866e2633096ae6ad81301
transient db = /mydb.sqlite3
Create a table...
...
count(*) from t = 18
Finished running demo on main thread.


Running demo on worker thread.
sqlite3 version 3.44.0 2023-11-01 11:23:50 17129ba1ff7f0daf37100ee82d507aef7827cf38de1866e2633096ae6ad81301
transient db = /mydb.sqlite3
Create a table...
...
count(*) from t = 18
Finished running demo on worker.
SQL TRACE #2 via sqlite3@659304: CREATE TABLE IF NOT EXISTS t(a,b)
...
SQL TRACE #43 via sqlite3@659304: select count(*) from t
```

Surprisingly the worker thread keeps sends all its tracing after we've closed the database. I'm not sure why that is.

## Running in browser

```
npm run dev
```

Should give you something like this:

![Screenshot of browser showing results of running sqlite demo on main and worker thread.](/screenshots/browser.png?raw=true)
