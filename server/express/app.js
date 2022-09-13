const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = {
	players: require("./routes/players"),
	games: require("./routes/games"),
};

const app = express();

app.use(cors());

app.use(bodyParser.json());

function makeHandlerAwareOfAsyncErrors(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

// We provide a root route just as an example
app.get("/", (req, res) => {
    res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
    if (routeController.getAll) {
        app.get(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.getAll)
        );
    }
    if (routeController.getById) {
        app.get(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getById)
        );
    }
    if (routeController.create) {
        app.post(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.update) {
        app.put(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        app.delete(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
    if (routeController.getSections) {
         app.get(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getSections)
		 );
    }
    if (routeController.getAssignments) {
        console.log(`/api/${routeName}/getassignments`);
        app.post(
            `/api/${routeName}/getassignments`,
            makeHandlerAwareOfAsyncErrors(routeController.getAssignments)
        )
    }
}

const gameController = require('./routes/games');
app.get(
    `/api/games/win1/:id`,
    makeHandlerAwareOfAsyncErrors(gameController.win1)
);

app.get(
    `/api/games/win2/:id`,
    makeHandlerAwareOfAsyncErrors(gameController.win2)
);

app.get(
    `/api/games/reset/:id`,
    makeHandlerAwareOfAsyncErrors(gameController.reset)
);

module.exports = app;
