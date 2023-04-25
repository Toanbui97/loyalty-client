import { getTransactionUrl } from "./ApUtil";
import  * as uuid from 'uuid';

const orchestrationTransactionUrl = process.env.REACT_APP_ORCHESTRATION_TRANSACTION;
const orchestrationVoucherUrl = process.env.REACT_APP_ORCHESTRATION_VOUCHER;

const requestBody = {
    "requestId" : uuid.v4()
}

export const orchestratrionTransaction = async (listItem) => {
    let body = {
        transactionId :uuid.v4(),
        customerCode: 'c448768f-a5d7-40ba-8248-fe9007c4313f',
        transactionType: 'PAYMENT_TYPE',
        transactionTime: new Date(), 
        data: {
            transactionValue: listItem.map(item => item.price * item.number).reduce((s1, s2) => s1 + s2, 0)
        }
    };
    // body.transactionId = uuid.v4();
    // body.customerCode = 'e2d5c896-e9b2-447f-89e0-f9f7b847de05';
    // body.transactionType = 'PAYMENT_TYPE';
    // body.transactionTime = new Date();
    // body.data.transactionValue = listItem.map(item => item.price).reduce((s1, s2) => s1 + s2, 0);
    requestBody.data = body;
    return await fetch(getTransactionUrl(orchestrationTransactionUrl, null, null), {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}
