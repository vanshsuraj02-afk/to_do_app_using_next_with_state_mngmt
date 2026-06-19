"use client"

import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Toaster} from "sonner";

export function QueryProvider({children}){
    const [queryClient]= useState(()=>new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    )

}