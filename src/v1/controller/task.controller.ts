import { Request, Response, NextFunction } from "express";
import { db } from "../../app";
import { ApiError } from "../../utlils/error";
import { get } from "http";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Fetching all tasks');
        // Fetch all tasks from the database
        const tasks = await db.task.findMany({
            orderBy: {
                createdAt: 'desc', // Order tasks by creation date in descending order
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                tasks,
            },
        });
    } catch (error) {
        next(error);
    }
}

const getTodaysTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get today's date range (start and end of today in UTC)
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);

        // console.log(`Fetching tasks for today between: ${startOfDay.toISOString()} and ${endOfDay.toISOString()}`);

        // Fetch tasks created today from the database
        const tasks = await db.task.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        // console.log('Tasks fetched for today:', tasks);
        res.status(200).json({
            status: 'success',
            data: {
                tasks,
            },
        });
    } catch (error) {
        console.log('Error fetching tasks for date:', error);
        next(error);
    }
}

const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;
        console.log(`Fetching task with ID: ${taskId}`);
        // Fetch a single task by ID from the database
        const task = await db.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            throw new ApiError(404, 'Task not found');
        }
        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (error) {
        console.log('Error fetching task:', error);
        next(error);
    }
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTask = req.body;
        console.log(`Creating new task: ${JSON.stringify(newTask)}`);
        // Create a new task in the database
        const createdTask = await db.task.create({
            data: newTask,
        });
        res.status(201).json({
            status: 'success',
            data: {
                task: createdTask,
            },
        });
    } catch (error) {
        console.log('Error creating task:', error);
        next(error);
    }
}

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        console.log(`Updating task with ID: ${taskId}`);
        // Update an existing task in the database
        const task = await db.task.update({
            where: { id: taskId },
            data: updatedTask,
        });
        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (error) {
        console.log('Error updating task:', error);
        next(error);
    }
}

const completeTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;
        console.log(`Completing task with ID: ${taskId}`);
        const toggleTask = req.body.isCompleted;
        if (toggleTask === undefined) {
            throw new ApiError(400, 'isCompleted field is required');
        }
        // Update the completion status of a task in the database
        await db.task.update({
            where: { id: taskId },
            data: { isCompleted: toggleTask },
        });
        res.status(200).json({
            status: 'success',
            message: 'Task completed successfully',
        });
    } catch (error) {
        console.log('Error completing task:', error);
        next(error);
    }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;
        console.log(`Deleting task with ID: ${taskId}`);
        // Delete a task from the database
        await db.task.delete({
            where: { id: taskId },
        });
        res.status(204).json({
            status: 'success',
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.log('Error deleting task:', error);
        next(error);
    }
}

export const taskController = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    getTodaysTasks,
};