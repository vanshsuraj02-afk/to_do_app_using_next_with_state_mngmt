"use server"

import {revalidatePath} from "next/cache";
import Todo from "@/model/todo";
import connectDB from "@/lib/db";
import {createTodoSchema} from "@/validations/todo";

export async function createTodo(data) {

    try {
        const validatedData = createTodoSchema.parse(data);
        await connectDB();
        const todo = await Todo.create(validatedData);
        revalidatePath("/");
        return {
            success: true,
            data:JSON.parse(JSON.stringify(todo))
        }
    }catch (error){
        return {
            success: false,
            error: error? error.message :"Failed to create todo"
        }
    }
}


export async function getTodos(){
    try {
        await connectDB();
        const todos = await Todo.find({}).sort({createdAt:-1});
        return {
            success: true,
            data: JSON.parse(JSON.stringify(todos))
        }
    }catch (error){
        console.error("Errors fetching todos : ", error);
        return {
            success: false,
            error: error? error.message :"Failed to fetch todos"
        }
    }
}

export async function toggleTodo(id) {
    try {
        await connectDB();
        const todo = await Todo.findById(id);
        if(!todo){
            return {
                success: false,
                error:"Todo not found"
            }
        }
        todo.completed = !todo.completed;
        await todo.save();
        revalidatePath("/");
        return {
            success: true,
            data: JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        return {
            success: false,
            error: error?.message || "Failed to toggle todo"
        }
    }
}