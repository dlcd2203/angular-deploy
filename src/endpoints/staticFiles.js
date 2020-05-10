// (C) 2020 GoodData Corporation

// (C) 2020 GoodData Corporation
const express = require("express");

function redirect404ToIndex(req, res, next) {
    req.url = "/index.html";
    next();
}

module.exports = (app, sdk, { serveFrom }) => {
    const staticServer = express.static(serveFrom, { redirect: false });

    app.use(staticServer);
    app.get("*", redirect404ToIndex);
    app.use(staticServer);

    console.log(`Serving from ${serveFrom}`); // eslint-disable-line no-console
};
