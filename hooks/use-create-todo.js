import {useTodoStore} from "@/store/todo-store";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTodo, deleteTodo, getTodos, toggleTodo} from "@/actions/todo-actions";


export const todoKeys = {
    all:["todo"],
    lists:()=>[...todoKeys.all,"list"]
}
export function useCreateTodo() {
    const queryClient = useQueryClient();
    const addTodo = useTodoStore((state) => state.addTodo);

    return useMutation({
        mutationFn: (data) => createTodo(data),
        onSuccess:(result) => {
            if (result.success) {
                addTodo(result.data)

                queryClient.invalidateQueries({queryKey: todoKeys.lists()}).then(r => (console.log("Queries invalidated")))
            }
        }
    })

}

export function useTodos(){
    const setTodos = useTodoStore((state) => state.setTodos);
    return useQuery({
        queryKey: todoKeys.lists(),
        queryFn: async () => {
            const result = await getTodos();
            console.log(result);
            if (result.success) {
                setTodos(result.data);
                return result.data;

            }
            throw new Error(result.error);
        }
    })
}


export function useToggleTodo(){
    const queryClient = useQueryClient();
    const updateTodoInStore = useTodoStore((state) => state.updateTodo);
    return useMutation({
        mutationFn: (id) => toggleTodo(id),
        onSuccess: (result,id) => {
            if (result.success) {
                updateTodoInStore(id,{completed: result.data.completed});
                queryClient.invalidateQueries({queryKey: todoKeys.lists()}).then(r => (console.log("Queries invalidated")));
            }
        }
    })
}


export function useDeleteTodo() {
    const queryClient = useQueryClient();
    const removeTodo = useTodoStore((state) => state.removeTodo);
    return useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: (result,id) => {
            if (result.success) {
                removeTodo(id);
                queryClient.invalidateQueries({queryKey: todoKeys.lists()}).then(r => (console.log("Queries invalidated")));
            }
        }
    })
}