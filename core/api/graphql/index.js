const { mergeSchemas } = require('@graphql-tools/merge');
const SwiftRemoteSchema = require('./remote');
const CrmRemoteSchema = require('./remote/crm');
const AuthSchema = require('./schema/index');
const { features } = require('../../../swift.config');

const executor = async () => {
    let schemas = null;
    const SwiftSchema = await SwiftRemoteSchema();
    if (features.crm.enabled) {
        const CrmSchema = await CrmRemoteSchema();
        schemas = mergeSchemas({
            schemas: [AuthSchema, CrmSchema, SwiftSchema],
        });
    } else {
        schemas = mergeSchemas({
            schemas: [AuthSchema, SwiftSchema],
        });
    }

    return schemas;
};

module.exports = executor;
