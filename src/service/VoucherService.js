import env from "react-dotenv"
import  * as uuid from 'uuid';
import useAlert from '../context/UseAler.js';
import { getVoucherUrl } from "./ApUtil.js";

const baseUrl = process.env.REACT_APP_VOUCHER_BASEURL;
const receiveVoucherListEndpoint = process.env.REACT_APP_VOUCHER_RECEIVE_VOUCHER_LIST;
const updateVoucherInfoEndpoint = process.env.REACT_APP_VOUCHER_UPDATE_VOUCHER_INFO;
const receiveVoucherInfoEndpoint = process.env.REACT_APP_VOUCHER_RECEIVE_VOUCHER_INFO;
const createVoucherInfoEndPoint = process.env.REACT_APP_VOUCHER_CREATE_VOUCHER_INFO
const deleteVoucherEndpoint = process.env.REACT_APP_VOUCHER_DELETE_VOUCHER_URL;

const requestBody = {
    "requestId" : uuid.v4()
}

export const getVoucherList = async (page, size) => {
    return await fetch(getVoucherUrl(receiveVoucherListEndpoint, null, {page : page, size : size}), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const updateVoucherInfo = async (data) => {
    requestBody.data = data;
    return await fetch(getVoucherUrl(updateVoucherInfoEndpoint, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    }) 
}

export const createVoucherInfo = async (data) => {
    requestBody.data = data;
    return await fetch(getVoucherUrl(createVoucherInfoEndPoint, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const getVoucherInfo = async (voucherCode) => {

    return await fetch (getVoucherUrl(receiveVoucherInfoEndpoint, {voucherCode: voucherCode}, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}

export const deleteVoucher = async (voucherCode) => {
    return await fetch(getVoucherUrl(deleteVoucherEndpoint, {voucherCode: voucherCode}, null) , {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}