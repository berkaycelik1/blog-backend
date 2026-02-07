class AppResponse {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

class AppSuccessResponse extends AppResponse {
    constructor(message, data) {
        super(true, message, data);
    }
}

class AppFailResponse extends AppResponse {
    constructor(message) {
        super(false, message, null);
    }
}
module.exports = { AppSuccessResponse, AppFailResponse};
