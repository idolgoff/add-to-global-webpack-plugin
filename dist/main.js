
(function () {
    // Function to safely assign a value to a path inside an object
    const assignValueToPath = (path, value, obj) => {
        const keys = path.split(".");
        keys.reduce((acc, key, index) => {
            acc[key] = index === keys.length - 1 ? value : acc[key] || {};
            return acc[key];
        }, obj);
    };

    const path = 'test.path';
    const value = "test value";
    const isInNode = (typeof process !== 'undefined' && process.versions && process.versions.node);
    assignValueToPath(path, value, isInNode ? global : window);
})();
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dummy.js":
/*!******************!*\
  !*** ./dummy.js ***!
  \******************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://add-to-global-webpack-plugin/./dummy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./dummy.js"]();
/******/ 	
/******/ })()
;