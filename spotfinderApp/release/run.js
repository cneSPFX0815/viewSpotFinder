#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMesh = void 0;
function getLogger() {
    var log4js = require("log4js");
    var logFile = "logSpotFinder.log";
    log4js.configure({
        appenders: { viewSpotLog: { type: "file", filename: logFile } },
        categories: { default: { appenders: ["viewSpotLog"], level: "info" } }
    });
    return log4js.getLogger("viewSpotLog");
}
var getMesh = function () {
    console.time("Execution Time");
    var isValidInput = true;
    var logger = getLogger();
    var meshObj = null;
    var viewSpotCount = 0;
    //validate input
    if (!process.argv[2]) {
        logger.error("Mesh Object Missing");
        isValidInput = false;
    }
    else {
        try {
            meshObj = require(process.argv[2]);
            if (meshObj.values && meshObj.elements && meshObj.nodes) {
                logger.info("Mesh Object Found and validated");
            }
            else {
                isValidInput = false;
            }
        }
        catch (_a) {
            logger.error("Mesh Object Found, but not valid");
            isValidInput = false;
        }
    }
    if (!process.argv[3]) {
        logger.error("View Spot Count missing");
        isValidInput = false;
    }
    else {
        viewSpotCount = parseInt(process.argv[3]);
        logger.info("Test");
        if (viewSpotCount > 0) {
            logger.error("View Spot Count found. ".concat(viewSpotCount));
        }
        else {
            logger.error("View Spot Count found, but not a valid number");
            isValidInput = false;
        }
    }
    if (isValidInput) {
        meshObj.values = meshObj.values.sort(function (a, b) { return b.value - a.value; });
        var viewSpots = new Array();
        var resumeLoop = true;
        var valueIndex = 0;
        try {
            var currentValue_1;
            var _loop_1 = function () {
                currentValue_1 = meshObj.values[valueIndex];
                var element = meshObj.elements.find(function (elm) { return elm.id == currentValue_1.element_id; });
                var allNeighbours = new Array();
                element.nodes.forEach(function (nodeId) {
                    allNeighbours.push(meshObj.elements.find(function (elm) { return elm.nodes.includes(nodeId); }));
                });
                //check if neighbours are higher then current value
                var isViewSpot = true;
                allNeighbours.forEach(function (neighbour) {
                    var neighBourValue = meshObj.values.find(function (val) { return val.element_id == neighbour.id; });
                    if (neighBourValue.value > currentValue_1.value) {
                        isViewSpot = false;
                    }
                });
                if (isViewSpot) {
                    viewSpots.push(currentValue_1);
                }
                if (viewSpots.length == viewSpotCount) {
                    resumeLoop = false;
                }
                valueIndex++;
            };
            while (resumeLoop && valueIndex < meshObj.values.length) {
                _loop_1();
            }
        }
        catch (error) {
            logger.error("Error occured");
        }
        console.log(viewSpots);
    }
    else {
        logger.info("No valid input");
    }
};
exports.getMesh = getMesh;
//# sourceMappingURL=run.js.map