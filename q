[1mdiff --git a/infra/database.js b/infra/database.js[m
[1mindex 6fbb58f..a14e209 100644[m
[1m--- a/infra/database.js[m
[1m+++ b/infra/database.js[m
[36m@@ -7,6 +7,7 @@[m [masync function query(queryObject) {[m
     user: process.env.POSTGRES_USER,[m
     database: process.env.POSTGRES_DB,[m
     password: process.env.POSTGRES_PASSWORD,[m
[32m+[m[32m    ssl: process.env.NODE_ENV === "development" ? false : true,[m
   });[m
 [m
   console.log("Credencias do postgres: ", {[m
[36m@@ -16,13 +17,13 @@[m [masync function query(queryObject) {[m
     database: process.env.POSTGRES_DB,[m
     password: process.env.POSTGRES_PASSWORD,[m
   });[m
[31m-[m
   try {[m
     await client.connect();[m
     const result = await client.query(queryObject);[m
     return result;[m
   } catch (error) {[m
     console.error("Database connection error:", error);[m
[32m+[m[32m    throw error;[m
   } finally {[m
     await client.end();[m
   }[m
