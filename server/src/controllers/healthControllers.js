const getHealthStatus = (req, res) => {
    res.json({
        success: true,
        message: "InterviewHub API is running"
    });
};

module.exports = {
    getHealthStatus
};