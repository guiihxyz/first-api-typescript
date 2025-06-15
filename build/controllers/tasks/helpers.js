import { StatusCodes } from "http-status-codes";
export function notFoundTask(id, reply) {
    return reply.status(StatusCodes.NOT_FOUND).send({
        message: `No task found with id: ${id}`
    });
}
