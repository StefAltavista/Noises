export function setAccountReducer(account = {}, action) {
    if (action.type == "SET_ACCOUNT_UP") {
        account = { ...action.payload.account, ...account };
        console.log(account);
    }
    return account;
}

export function setAccount(account) {
    return {
        type: "SET_ACCOUNT_UP",
        payload: { account },
    };
}
