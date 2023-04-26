import env from "react-dotenv"
import  * as uuid from 'uuid';
import useAlert from '../context/UseAler.js';
import { getCMSUrl } from "./ApUtil.js";

const baseUrl = process.env.REACT_APP_CMS_BASEURL;
const receiveCustomerList = process.env.REACT_APP_CMS_RECEIVE_CUSTOMER_LIST;
const receiveCustomerInfo = process.env.REACT_APP_CMS_RECEIVE_CUSTOMER_DETAIL;
const updateCustomerInfo = process.env.REACT_APP_CMS_UPDATE_CUSTOMER;
const receiveRankList = process.env.REACT_APP_CMS_RECEIVE_RANK_LIST;
const receiveRankInform = process.env.REACT_APP_CMS_RECEIVE_RANK_DETAIL;
const updateRankInform = process.env.REACT_APP_CMS_UPDATE_RANK_DETAIL
const createRankUrl = process.env.REACT_APP_CMS_CREATE_RANK_URL;
const createCustomerUrl = process.env.REACT_APP_CMS_CREATE_CUSTOMER_URL;
const deleteCustomerUrl = process.env.REACT_APP_CMS_DELETE_CUSTOMER_URL;
const deleteRankUrl = process.env.REACT_APP_CMS_DELETE_RANK_URL;
const signInUrl = process.env.REACT_APP_CMS_SIGN_IN_URL;
// const setAlert = useAlert();

const requestBody = {
    "requestId" : uuid.v4()
}

export const signIn = async (customerName) => {
    return await fetch(getCMSUrl(signInUrl, {customerName}, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const getCustomerList = async (page, size) => {
    return await fetch(getCMSUrl(receiveCustomerList, null, {page : page, size : size}), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
};

export const getCustomerDetail = async (customerCode) => {
    return await fetch(getCMSUrl(receiveCustomerInfo, {customerCode: customerCode}, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const updateCustomer = async (customer) => {
    requestBody.data = customer;
    console.log(JSON.stringify(requestBody));
    return await fetch(baseUrl+updateCustomerInfo, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    })
}

export const getRankList = async () => {
    return await fetch(baseUrl+ receiveRankList, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
};

export const getRankDetail = async (rankCode) => {
    const data = {"rankCode" : rankCode};
    requestBody.data = data;
    console.log(requestBody);
    return await fetch(baseUrl+ receiveRankInform, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const updateRank = async (rank) => {
    requestBody.data = rank;
    console.log(requestBody);
    return await fetch(baseUrl+updateRankInform, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const createRank = async (data) => {
    requestBody.data = data;
    console.log(JSON.stringify(requestBody));
    return await fetch(getCMSUrl(createRankUrl, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const createCustomer = async (data) => {
    requestBody.data = data;
    console.log(JSON.stringify(requestBody));
    return await fetch(getCMSUrl(createCustomerUrl, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const deleteCustomer = async (code) => {
    return await fetch(getCMSUrl(deleteCustomerUrl, {customerCode: code}, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const deleteRank = async (code) => {
    return await fetch(getCMSUrl(deleteRankUrl, {rankCode: code}, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}