export class HttpError extends Error {
    constructor() {
        super();
    }
}

export class InternalServerError extends HttpError {
    constructor(msg = "internal server error") {
        super();
        this.code = 500;
        this.message = msg;
    }
}

export class BadRequest extends HttpError {
    constructor(msg = "bad request") {
        super();
        this.code = 400;
        this.message = msg;
    }
}

export class NotFound extends HttpError {
    constructor(msg = "resource not found") {
        super();
        this.code = 404;
        this.message = msg;
    }
}
