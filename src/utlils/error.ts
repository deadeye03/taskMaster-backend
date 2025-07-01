type ErrorData =
    | string
    | { path: string | null; message: string }
    | { path: string | null; message: string }[];

class ApiError extends Error {
    status: number;
    success: boolean;
    errorData: ErrorData;
    timestamp: Date;
    constructor(
        status: number,
        errorData: ErrorData = 'Something went wrong',
        name: string = 'API Error'
    ) {
        super();
        this.status = status;
        this.success = false;
        this.name = name;
        this.timestamp = new Date();

        if (typeof errorData == 'string') {
            this.errorData = [
                {
                    path: null,
                    message: errorData,
                },
            ];
        } else if (Array.isArray(errorData)) {
            this.errorData = errorData;
        } else {
            this.errorData = [errorData];
        }
    }
}

export { ApiError };
