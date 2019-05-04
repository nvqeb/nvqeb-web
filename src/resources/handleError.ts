import { inspect } from "util";

// Resourses
import strings from "./strings";
// import { ErrorType } from "@startapp/nvqeb-user-api";

enum ErrorType {
    Fatal = "Fatal",
    Connection = "Connection",
}

export function handleError(e: any): string {
    const apiError: { type?: ErrorType, message?: string } = e;

    if (apiError.message && apiError.type !== ErrorType.Connection && apiError.type !== ErrorType.Fatal) {
        return apiError.message;
    }

    console.log(inspect(e));
    return strings.error.default;
}
