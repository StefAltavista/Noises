////////////SECURITY CHECK/////////////

/////NEEDS PROPPER IMPLEMENTATION/////

/////   ->  SEARCH BAR
/////   ->  CREATE EVENT
/////   ->  MESSAGES

function checkRegistration(req, res, next) {
    const { email, first, last } = req.body;

    if (!/^[a-zA-Z]+$/.test(first)) {
        console.log("first name invalid");
        res.json({ e: "invalid Name", id: null });
        return;
    }
    if (!/^[a-zA-Z]+$/.test(last)) {
        console.log("last name invalid");
        res.json({ e: "invalid Surname", id: null });
        return;
    }
    // if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/.test(email)) {
    //     res.json({ e: "invalid e-mail address", id: null });
    //     return;
    // }

    next();
}

module.exports = {
    checkRegistration,
};
