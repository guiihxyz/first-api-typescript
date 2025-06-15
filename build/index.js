import fastify from "fastify";
import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import path from "node:path";
import { fileURLToPath } from "url";
import log from "consola";
import ck from "chalk";
import "#settings/env.js";
import { errorHandler } from "#functions/error.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = fastify();
app.setErrorHandler(errorHandler);
await app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
});
await app.register(autoload, {
    dir: path.join(__dirname, "routes"),
    routeParams: true
});
app.addHook("onRoute", ({ method, path }) => {
    if (method === "HEAD" || method === "OPTIONS") {
        return;
    }
    log.success(`${ck.yellow(method)} ${ck.blue(path)}`);
});
const port = process.env.PORT || 8080;
await app.listen({ port, host: "0.0.0.0" })
    .catch(err => {
    log.error(err);
    process.exit(1);
});
log.success(ck.green(`Server listening on port ${port}`));
