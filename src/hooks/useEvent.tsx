import { useCallback } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

export default function useEvent(handler: any) {
    const handlerRef = useRef(null);

    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args: any) => {
        const fn: any = handlerRef.current;
        return fn(...args);
    }, []);
}
