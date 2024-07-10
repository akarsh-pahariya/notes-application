import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import pg from "pg";

const port = 3000;
const app = express();
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Notes_Application",
    password: "@Akarsh_16",
    port: 5433,
});

db.connect();
passport.use(
    new LocalStrategy(async (USERNAME, PASSWORD, done) => {
        try {
            console.log(`Recieved Credentials are - ${USERNAME} & ${PASSWORD}`);
            const json = await db.query(
                "SELECT * FROM user_info WHERE username=$1",
                [USERNAME]
            );
            const user = json.rows[0];
            if (user.length === 0) {
                return done(null, false, { message: "Username not found" });
            }
            const passwordMatch = PASSWORD === user.password ? true : false;
            if (passwordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password is incorrect" });
            }
        } catch (error) {
            return done(error);
        }
    })
);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, async (req, res) => {
    const json = await db.query("SELECT * FROM user_info");
    const data = json.rows;
    console.log(data);
    res.send("Hello World !!");
});

app.listen(port, () => {
    "Server is live at port ", port;
});
