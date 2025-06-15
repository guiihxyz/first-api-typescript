import { defineRoute } from "#functions/utils.js";
import { StatusCodes } from "http-status-codes";

export default defineRoute(app => {
    app.get("/", (_req, reply) => {
        reply.status(StatusCodes.OK).send({
            message: "Hello, World!"
        })
    })
})
