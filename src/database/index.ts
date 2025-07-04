import { TaskSchema } from "#schemas/task.js";
import { QuickDB } from "quick.db";

export const db = {
    tasks: new QuickDB<TaskSchema>({ table: "tasks", filePath: "localdb.sqlite" })
}
