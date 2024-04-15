# AddToWindowPlugin for Webpack

The `AddToWindowPlugin` is a Webpack plugin designed to enhance your application by allowing you to inject global variables into the `window` object directly from your Webpack configuration. This can be particularly useful for storing some usefull meta information such as app versions, CI/CD process details, build date and time, for setting up global configurations, API keys, or feature flags.

## Advantages

-   **Simplicity**: Easy to set up with just a few lines of configuration.
-   **Flexibility**: Supports adding values to any depth within the `window` object using dot notation paths.
-   **No Additional Files**: Injects values directly into the main chunk without creating extra files.
-   **Runtime Efficiency**: Executes the injection at runtime, ensuring no impact on build-time processes.

## Installation

To install the `AddToWindowPlugin`, you can simply copy the plugin code into a file in your project, typically named `AddToWindowPlugin.js`.

## Usage

First, import the plugin at the top of your Webpack configuration file:

```javascript
const AddToWindowPlugin = require("./path/to/AddToWindowPlugin");
```

Then, add the plugin to your Webpack configuration:

```javascript
module.exports = {
    // ... other webpack config
    plugins: [
        new AddToWindowPlugin({
            path: "myApp.meta",
            value: {
                version: "v1.1.3.7684",
                hash: "1f24b06c2971a254798e48e91b11c9559343bb62",
                buildDate: "Fri Apr 12 14:14:24 2024",
            },
        }),
    ],
};
```

This configuration will inject your value into `window.myApp.meta`.

## Examples

Here’s an example of how to use the plugin to inject a nested configuration object into the window object:

```javascript
new AddToWindowPlugin({
    path: "myApp.config",
    value: {
        apiKey: "abcde12345",
        featureFlags: {
            betaFeature: true,
        },
    },
});
```

After the build, your application will have access to `window.myApp.config.apiKey` and `window.myApp.config.featureFlags.betaFeature`.

## Contributing

Contributions are welcome! Feel free to submit pull requests or create issues for any bugs you find or enhancements you propose.
