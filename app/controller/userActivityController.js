// const db = require('../config/db.config.js')
const MongoUserActivity = require('../mongodbModel/userActivities.model')
// const UserActivity = db.userActivities

function isEmpty(obj) {
    return !Object.keys(obj).length > 0
}

createActivity = async (userId, action, description, username, authority, isUserInformed) => {
    if (!userId || !action || !description || !username || !authority) {
        return false
    }
    if (typeof description !== "string")
        description = description.toString();

    UserActivity.create({
        userId: userId,
        action: action,
        description: description,
        username: username,
        authority: authority,
        userInformed: isUserInformed ? true : false
    })
}

/**
   * @param {!Object} req - req
   * @param {!string} action - Action (login, logout, update, get)
   * @param {!string} description - Type of the error (cron, mail etc.)
   * @param {!string} status - Status (200, 400, 402)
*/
createActivityLog = async (req, action, status, description) => {
    try {
        if (!req || !req.user || !req.user.userId || !action || !status) {
            return false
        }
        if (description && typeof description !== "string")
            description = description.toString();

        let platform = "web"
        try {
            if (req.url.substr(0, 11) === "/api/mobile")
                platform = "mobile"
        } catch (error) { }
        MongoUserActivity.create({
            user: req.user.userId,
            url: req.url,
            action: action,
            agent: req.headers['user-agent'],
            platform: platform,
            error: description,
            status: status,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress //|| req.socket.remoteAddress
        })
    } catch (error) {
        console.log(error)
    }

}

getUserActivityLogByUserIdCount = async (id) => {
    return MongoUserActivity.countDocuments({ userId: id })
}

getUserActivityByUserIdCount = async (id) => {
    return UserActivity.count({ where: { userId: id } })
}


getActivityLogByUserId = async (id, page, pageSize) => {
    return Promise.all([
        getUserActivityLogByUserIdCount(id),
        MongoUserActivity.find({
            userId: id
        }).skip(Number(page) * Number(pageSize)).limit(Number(pageSize)).sort({ createdAt: -1 }).lean()
    ]).then(resp => {
        return { rowCount: resp[0], activityLogs: resp[1] }
    }).catch(err => {
        console.log(err)
    })

}

getActivityByUserId = async (id, page, pageSize) => {
    return Promise.all([
        getUserActivityByUserIdCount(id),
        UserActivity.findAll({
            where: {
                userId: id,
            },
            limit: pageSize,
            offset: typeof (pageSize * page) === 'number' ? (pageSize * page) : 0,
            order: [["createdAt", "DESC"]]
        })
    ]).then(resp => {
        return { rowCount: resp[0], activities: resp[1] }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    createActivity,
    /**
     * @param {!Object} req - req
     * @param {!string} action - Action (login, logout, update, get)
     * @param {!string} status - Status (200, 400, 402)
     * @param {!string} description - Some description
    */
    createActivityLog,
    getActivityLogByUserId,
    getActivityByUserId
}
