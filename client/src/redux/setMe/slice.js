export function setAccountReducer(account = {}, action) {
    if (action.type == "SET_ACCOUNT_UP") {
        console.log("setmeupReducer:", action.payload.account);

        account = { ...action.payload.account, ...account };
        console.log(account);

        //WITH JSON STRINGIFY
        // const me = JSON.stringify(action.payload.account);
        // me.json().then(
        //     (myaccount) => (account = { acount: myaccount, ...account })
        // );
    }
    return account;
}

export function setAccount(account) {
    console.log("action:", account);
    return {
        type: "SET_ACCOUNT_UP",
        payload: { account },
    };
}
