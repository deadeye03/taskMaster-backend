import { Router } from "express";
import { taskController } from "../controller/task.controller";

const taskRouter = Router();

// Define your task-related routes here

taskRouter.get("/today", taskController.getTodaysTasks);

taskRouter.get("/", taskController.getAllTasks);

taskRouter.get("/:id", taskController.getTask);

taskRouter.post("/", taskController.createTask);

taskRouter.put("/:id", taskController.updateTask);

taskRouter.delete("/:id", taskController.deleteTask);

taskRouter.patch("/:id/complete", taskController.completeTask);

// Export the task router
export default taskRouter;