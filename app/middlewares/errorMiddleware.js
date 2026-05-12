// Global error handling middleware

const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error"

    if (error.name === "CastError") {//when invalid objectID format
        message = `Resource not found. Invalid: ${error.path}`;
        statusCode = 404;

    }

    if (error.code === 11000) {//11000 means: You tried to insert a value that must be unique, but it already exists
        message = "Duplicate field value entered";
        statusCode = 400;
    }

    if (error.name === "ValidationError") {
        message = Object.values(error.errors).map(value => value.message).join(', ')
        //Object.value(error.errors) converts the objcet into array 
        //   example:- [
        //   { message: "Title is required" },
        //   { message: "Description is too short" }
        // ]
        statusCode = 400
    }


    res.status(statusCode).json({
        success: false,
        message: message
    });
}

module.exports = errorMiddleware;
