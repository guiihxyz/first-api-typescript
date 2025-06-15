import { tasksService } from "#services/tasks.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { notFoundTask } from "./helpers.js";
import { StatusCodes } from "http-status-codes";

interface DeleteRoute {
    Params: {
        id: string;
    }
}

async function controller(req: FastifyRequest<DeleteRoute>, reply: FastifyReply) {
    const { id } = req.params;
    const exists = await tasksService.exists(id);

    if (!exists) {
        return notFoundTask(id, reply);
    }

    await tasksService.delete(id);

    return reply.status(StatusCodes.OK).send({
        message: "Task deleted successfulyy!"
    });
}

export { controller as deleteTaskController }
