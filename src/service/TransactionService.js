import { getTransactionUrl } from "./ApUtil";
import  * as uuid from 'uuid';

const orchestrationTransactionUrl = process.env.REACT_APP_ORCHESTRATION_TRANSACTION;
const orchestrationVoucherUrl = process.env.REACT_APP_ORCHESTRATION_VOUCHER;

const requestBody = {
    "requestId" : uuid.v4()
}

export const orchestratrionTransaction = async (listItem, voucherList, pointUse) => {

    let applyList = voucherList.filter(v => v.checked);
    let discountPercent = applyList.map(v => v.discountPercent).reduce((s1, s2) => s1+s2, 0) + pointUse * 10;
    let transactionValue = (listItem.map(item => item.price * item.number).reduce((s1, s2) => s1 + s2, 0) - discountPercent/100 - pointUse*10).toFixed(2);
    let customerCode = JSON.parse(localStorage.getItem("customer"))?.customerCode;
    let body = {
        transactionId :uuid.v4(),
        customerCode: customerCode,
        transactionType: 'PAYMENT_TYPE',
        transactionTime: new Date(), 
        data: {
            transactionValue: transactionValue,
            voucherCodeList: applyList.map(v => v.voucherCode),
            pointUse: pointUse
        }
    };
    // body.transactionId = uuid.v4();
    // body.customerCode = 'e2d5c896-e9b2-447f-89e0-f9f7b847de05';
    // body.transactionType = 'PAYMENT_TYPE';
    // body.transactionTime = new Date();
    // body.data.transactionValue = listItem.map(item => item.price).reduce((s1, s2) => s1 + s2, 0);
    requestBody.data = body;
    console.log(JSON.stringify(requestBody))

    return await fetch(getTransactionUrl(orchestrationTransactionUrl, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}


export const orchestrationVoucher = async (voucher) => {

    let body = {
        numberVoucher : 1,
        voucherCode: voucher.voucherCode,
        epointSpend: voucher.price,
        customerCode: JSON.parse(localStorage.getItem("customer"))?.customerCode
    }
    
    requestBody.data = body;

    console.log(JSON.stringify(requestBody));

    return await fetch(getTransactionUrl(orchestrationVoucherUrl, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}