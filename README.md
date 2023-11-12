# sqlite-wasm-demo
A little demo of sqlite-wasm running in node and browser. 
This performs the same actions as the [https://sqlite.org/wasm/file/demo-123.js](https://sqlite.org/wasm/file/demo-123.js) file.
It has been refactored a bit to allow running in node as well as in the browser.

## Building

```
npm i
```

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
SQL TRACE #43 via sqlite3@659304: select count(*) from t
count(*) from t = 18
Finished running demo on main thread.

------------------------------------------------------------------------------------------------------------------------

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

Notice how the worker thread traces the SQL statements at the very end and at not in between the other log messages as when running on the main thread.

## Running in browser

```
npm run dev
```

Should give you something like this:

![Screenshot of browser showing results of running sqlite demo on main and worker thread.](/screenshots/browser.png?raw=true)

Not shown are the SQL traces that are logged to the console.
