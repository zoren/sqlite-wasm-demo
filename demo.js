export const doDemo = (sqlite3) => {
  const db = new sqlite3.oo1.DB(":memory:");
  db.exec(
    "CREATE TABLE t1(a,b); INSERT INTO t1 VALUES(1,2); INSERT INTO t1 VALUES(3,4);"
  );
  for (const row of db.selectObjects("SELECT * FROM t1;")) {
    console.log(row);
  }
};
