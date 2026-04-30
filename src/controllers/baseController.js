export class BaseController {
    success(res, statusCode = 200, message, data = null){
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data
        });
    }

    error(res, message, statusCode = 500){
        return res.status(statusCode).json({
            success: false,
            message: message
        });
    }
}