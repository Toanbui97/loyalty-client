import env from "react-dotenv"

const receiveCustomerList = "http://localhost:8080/cms/api/v1/receiveCustomerList";


export const getCustomerList = async () => {
    const requestBody = {
        "requestId" : "akjsdajshdkjsahd"
    }
    return await fetch(receiveCustomerList, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(requestBody)
    });
}