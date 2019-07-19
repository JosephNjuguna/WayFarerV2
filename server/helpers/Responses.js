class Responses {
	static handleSuccess(statusCode, message, data, res) {
		return res.status(statusCode).json({
			status: statusCode,
			message,
			data,
		});
	}

	static notFound(message, res) {
		return res.status(404).json({
			status: 404,
			message,
		});
	}

	static handleError(statusCode, message, res) {
		return res.status(statusCode).json({
			status: statusCode,
			message,
		});
	}

	static internalError(res) {
		return res.status(500).json({
			status: 500,
			error: 'Internal server error',
		});
	}
}

export default Responses;
