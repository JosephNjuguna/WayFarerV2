class Responses {
	static handleSuccess(statusCode, message, data, res) {
		return res.status(statusCode).json({
			status: statusCode,
			message,
			data,
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
