import { tasksService } from "#services/tasks.js";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
const schema = z.object({
    name: z.string().min(3)
});
async function controller(req, reply) {
    const data = schema.parse(req.body);
    const newTask = await tasksService.create(data);
    return reply.status(StatusCodes.CREATED).send({
        message: "Task created successfully!",
        task: newTask,
    });
}
export { controller as createTaskController };
