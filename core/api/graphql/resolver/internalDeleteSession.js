const internalDeleteSession = async (parent, args, context) => {
    context.session.token = null;
    return {
        result: true,
    };
};

module.exports = internalDeleteSession;
