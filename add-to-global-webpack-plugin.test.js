const webpack = require("webpack");
const { createFsFromVolume, Volume } = require("memfs");

const AddToGlobalWebpackPlugin = require("./add-to-global-webpack-plugin"); // Import your plugin

const fs = createFsFromVolume(new Volume());

test("AddToGlobalWebpackPlugin test", (done) => {
    const compiler = webpack({
        // Your webpack config here
        mode: "development",
        context: __dirname, // This is the root of your project
        entry: "./dummy.js",
        output: {
            path: "/dist",
            filename: "index.js",
        },
        plugins: [
            new AddToGlobalWebpackPlugin({
                path: "foo.bar.path",
                value: "test value",
            }),
        ],
    });

    compiler.outputFileSystem = fs;

    compiler.run((err, stats) => {
        if (err) {
            return done(err);
        } else if (stats.hasErrors()) {
            return done(new Error(stats.toString()));
        }

        const outputCode = fs.readFileSync("/dist/index.js").toString();
        expect(outputCode).toContain('const path = "foo.bar.path";');
        expect(outputCode).toContain('const value = "test value";');

        done();
    });
});
