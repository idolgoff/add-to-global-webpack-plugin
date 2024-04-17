const { validate } = require("schema-utils");
const schema = {
    type: "object",
    properties: {
        path: {
            type: "string",
        },
        value: {
            anyOf: [
                { type: "string" },
                { type: "number" },
                { type: "object" },
                { type: "array" },
                { type: "boolean" },
                { type: "null" },
            ],
        },
    },
    required: ["path", "value"],
    additionalProperties: false,
};

/**
 * A Webpack plugin that assigns a value to a nested property on the window or global object.
 */
class AddToGlobalWebpackPlugin {
    /**
     * Creates an instance of AddToGlobalWebpackPlugin.
     * @param {Object} options - The options for the plugin.
     * @param {string} options.path - The path to the property on the window object.
     * @param {*} options.value - The value to assign to the property.
     */
    constructor(options) {
        validate(schema, options, {
            name: "Add To Global Webpack Plugin",
            baseDataPath: "options",
        });

        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            "AddToGlobalWebpackPlugin",
            (compilation) => {
                compilation.hooks.optimizeChunkAssets.tapAsync(
                    "AddToGlobalWebpackPlugin",
                    (chunks, callback) => {
                        chunks.forEach((chunk) => {
                            if (chunk.runtime && chunk.runtime.has("main")) {
                                chunk.files.forEach((file) => {
                                    const asset = compilation.assets[file];
                                    let content = asset.source();
                                    const self = this;

                                    // Inject the function and use it to assign the value
                                    const injection = `
(function () {
    // Function to safely assign a value to a path inside an object
    const assignValueToPath = (path, value, obj) => {
        const keys = path.split(".");
        keys.reduce((acc, key, index) => {
            acc[key] = index === keys.length - 1 ? value : acc[key] || {};
            return acc[key];
        }, obj);
    };

    const path = "${self.options.path}";
    const value = ${JSON.stringify(self.options.value)};
    const isInNode = Boolean(typeof process !== 'undefined' && process.versions && process.versions.node);
    assignValueToPath(path, value, isInNode ? global : window);
})();\n`;
                                    content = injection + content;
                                    compilation.assets[file] =
                                        new compiler.webpack.sources.RawSource(
                                            content,
                                        );
                                });
                            }
                        });
                        callback();
                    },
                );
            },
        );
    }
}

module.exports = AddToGlobalWebpackPlugin;
