exports.generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

exports.paginate = (query, page = 1, limit = 10) => query.skip((page - 1) * limit).limit(limit);
