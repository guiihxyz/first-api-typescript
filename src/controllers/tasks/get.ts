import { CreateTaskSchema } from "#schemas/task.js";
import { tasksService } from "#services/tasks.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { notFoundTask } from "./helpers.js";

const schema = z.object({
    name: z.string().min(3)
}) satisfies z.ZodType<CreateTaskSchema>;

async function getAll(_req: FastifyRequest, reply: FastifyReply) {
    const tasks = await tasksService.getAll();

    return reply.status(StatusCodes.OK).send({
        message: `Tasks ${tasks.length}`,
        tasks
    });
}

interface GetByIdRoute {
    Params: {
        id: string;
    }
}

async function getById(req: FastifyRequest<GetByIdRoute>, reply: FastifyReply) {
    const { id } = req.params;
    const task = await tasksService.getById(id);

    if(!task) {
        return notFoundTask(id, reply);
    }

    return reply.status(StatusCodes.OK).send(task);
}

export {
    getAll as getAllTaskController,
    getById as getByIdTaskController
 };
