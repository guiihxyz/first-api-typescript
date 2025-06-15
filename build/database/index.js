import { QuickDB } from "quick.db";
export const db = {
    tasks: new QuickDB({ table: "tasks", filePath: "localdb.sqlite" })
};
