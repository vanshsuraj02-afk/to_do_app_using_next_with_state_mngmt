import {useTodoStore} from "@/store/todo-store";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTodo, getTodos} from "@/actions/todo-actions";


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
