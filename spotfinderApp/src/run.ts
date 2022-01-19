#!/usr/bin/env node

import { ElementObject, Mesh, ValueObject } from "./interfaces/mesh";


function getLogger()
{
    const log4js = require("log4js");
    const logFile = `logSpotFinder.log`
    log4js.configure({
        appenders: { viewSpotLog: { type: "file", filename: logFile } },
        categories: { default: { appenders: ["viewSpotLog"], level: "info" } }
    });
    return log4js.getLogger("viewSpotLog");
}

export const getMesh = () =>
{
    console.time("Execution Time");
    let isValidInput: boolean = true;
    var logger = getLogger();
    
    let meshObj: Mesh =  null;
    let viewSpotCount: number = 0;

    //validate input
    if(!process.argv[2]) 
    {
        logger.error("Mesh Object Missing");
        isValidInput = false;
    }
    else
    {
        try
        {
            meshObj = require(process.argv[2]);
            
            if(meshObj.values && meshObj.elements && meshObj.nodes)
            {
                logger.info("Mesh Object Found and validated");
            }
            else
            {
                isValidInput = false;
            }
        }
        catch
        {
            logger.error("Mesh Object Found, but not valid");
            isValidInput = false;
        }
       
    }

    if(!process.argv[3]) 
    {
        logger.error("View Spot Count missing");
        isValidInput = false;
    }
    else
    {
        viewSpotCount = parseInt(process.argv[3]);
        if(viewSpotCount > 0)
        {
            logger.error(`View Spot Count found. ${viewSpotCount}`);
        }
        else
        {
            logger.error("View Spot Count found, but not a valid number");
            isValidInput = false;
        }
    }

    if(isValidInput)
    {
        meshObj.values = meshObj.values.sort((a,b) => b.value - a.value);
        let viewSpots: any[] = new Array<any>();

        let resumeLoop: boolean = true;
        let valueIndex: number = 0;

        try
        {
            let currentValue: ValueObject;
            while(resumeLoop && valueIndex < meshObj.values.length)
            {
                currentValue = meshObj.values[valueIndex];
                let element: ElementObject = meshObj.elements.find(elm => elm.id == currentValue.element_id);
                let allNeighbours: ElementObject[] = new Array<ElementObject>();
                element.nodes.forEach(nodeId => {
                    allNeighbours.push(meshObj.elements.find(elm => elm.nodes.includes(nodeId)));
                })
                //check if neighbours are higher then current value
                let isViewSpot : boolean = true
                allNeighbours.forEach(neighbour => {
                    let neighBourValue: ValueObject = meshObj.values.find(val => val.element_id == neighbour.id);
                    if(neighBourValue.value > currentValue.value)
                    {
                        isViewSpot = false;
                    }
                });
                if(isViewSpot)
                {
                    viewSpots.push(currentValue);
                }
                if(viewSpots.length == viewSpotCount)
                {
                    resumeLoop = false;
                }
                valueIndex++;
            }
        }
        catch(error)
        {
            logger.error("Error occured");
        }
        
        console.log(viewSpots);
    }
    else
    {
        logger.info("No valid input");
    }
}