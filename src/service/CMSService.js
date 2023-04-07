import env from "react-dotenv"
import  * as uuid from 'uuid';


const baseUrl = process.env.REACT_APP_CMS_BASEURL;
const receiveCustomerList = process.env.REACT_APP_CMS_RECEIVE_CUSTOMER_LIST;
const receiveCustomerInfo = process.env.REACT_APP_CMS_RECEIVE_CUSTOMER_DETAIL;

const requestBody = {
    "requestId" : uuid.v4()
}

export const getCustomerList = async (page, size) => {
    return await fetch(baseUrl+ receiveCustomerList + "?" + new URLSearchParams({page : page, size : size}), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
};

export const getCustomerDetail = async (customerCode) => {
    return await fetch(baseUrl+ receiveCustomerInfo + "/" +customerCode, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}