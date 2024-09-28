import { getSQLClient, getSQLPool } from "./sql_access.js";

const data = getSQLClient();

const dvpPrefix = "DVP-";
var listOfDVPNumbers;


export async function newDVP() {

    // I need to create a new DVP number. I must check the full DVP list and add
    // new one. 

    // Fetch SQL data
    // Load Database

    await data.connect();

    listOfDVPNumbers = await data.query('SELECT dvpnumber FROM public.dvp');
    
    await data.end();

    // I could just check last item and add the next but I want to be able to take a number
    // that could have been deleted. So I am grabbing the full list and then checking DVP
    // numbers to take the first free one. 

    console.log(listOfDVPNumbers.rows);


    
}