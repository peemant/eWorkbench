import bodyParser from "body-parser";
import { getSQLClient, getSQLPool } from "./sql_access.js";

const data = getSQLClient();

const dvpPrefix = "DVP-";
var dvpSuffix = 0;
var listOfDVPNumbers;


export async function newDVP() {

    // I need to create a new DVP number. I must check the full DVP list and add
    // new one. 

    // Fetch SQL data
    var query = {
        text: 'SELECT dvpnumber FROM public.dvp',
        rowMode: 'array',
    }

    var listOfDVPNumbers = await data.query(query);

    // I could just check last item and add the next but I want to be able to take a number
    // that could have been deleted. So I am grabbing the full list and then checking DVP
    // numbers to take the first free one. 

    // Go through the list of DVP numbers, starting from 0 and going up by one each loop.
    // 1- Check if I am at the last item of the list.
    
    while (true) {

        
        
        for (let index = 0; index < listOfDVPNumbers.rowCount; index++) {
            var lineItem = listOfDVPNumbers.rows[index];
            console.log(lineItem[0]);
            var dvp = dvpPrefix + dvpSuffix.toString();

            if (lineItem[0] != dvp) {
                console.log("New DVP number will be : " + dvp);
                return false;
            }else{
                dvpSuffix++;
                console.log("DVP number, " + dvp + " exists");
            }
        }

    }
    
}