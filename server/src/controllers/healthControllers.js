const getHealthStatus = (req, res) => {
    res.json({
        success: true,
        message: "InterviewHub API is running"
    });
};
const getAboutInfo = (req, res) => {
    res.json({
        project: "InterviewHub",
        version: "1.0.0",
        developer: "Manojna"
    });
};

module.exports = {
    getHealthStatus,
    getAboutInfo
};