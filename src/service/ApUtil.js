
const cmsBaseUrl = process.env.REACT_APP_CMS_BASEURL;
const voucherBaseUrl = process.env.REACT_APP_VOUCHER_BASEURL;

export const getCMSUrl = (endPoint, pathVariable, param) => {

    let url = cmsBaseUrl + endPoint;
    
    if (pathVariable) {
        for (const property in pathVariable) {
            url = url.replace(`{${property}}`, pathVariable[property].trim());
        }
    }

    if (param) {
        url = url + "?" + new URLSearchParams(param);
    }

    return url;
};

export const getVoucherUrl = (endPoint, pathVariable, param) => {

    let url = voucherBaseUrl + endPoint;
    
    if (pathVariable) {
        for (const property in pathVariable) {
            url = url.replace(`{${property}}`, pathVariable[property].trim());
        }
    }

    if (param) {
        url = url + "?" + new URLSearchParams(param);
    }

    return url;
}