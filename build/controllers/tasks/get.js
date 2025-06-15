import { tasksService } from "#services/tasks.js";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { notFoundTask } from "./helpers.js";
const schema = z.object({
    name: z.string().min(3)
});
async function getAll(_req, reply) {
    const tasks = await tasksService.getAll();
    return reply.status(StatusCodes.OK).send({
        message: `Tasks ${tasks.length}`,
        tasks
    });
}
async function getById(req, reply) {
    const { id } = req.params;
    const task = await tasksService.getById(id);
    if (!task) {
        return notFoundTask(id, reply);
    }
    return reply.status(StatusCodes.OK).send(task);
}
export { getAll as getAllTaskController, getById as getByIdTaskController };
