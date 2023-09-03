//sequelize
//.sync({force:true})
/*
.sync()
.then((result) => {
    //console.log(result)
    return User.findByPk(1)
}).then(user => {
    if (!user) {
        return User.create({ name: "arif", email: "arif@123" })//will return a promise 
    }
    return user//it will be wrapped inside a promise and it will look like .... resolve(user), default behaviour of js inside .then return
}).then((user) => {
    console.log(user)
    app.listen(3000, (err) => {
        console.log("listening at port 3000")
    })
}).catch((err) => {
    console.log(err)
})
*/
//this file is not being exicuted in app.js exicution
//if you have nested promise (means inside .then u have to use again .then , in that case u can return
// that promise and use . then at first .then level)
//in case agar returned value (from indside .then )agar promise nhi hua to js will convert that in immediate resolving promise

//example
const newPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res(" i m new promise")
    }, 1000)
})
function promise(newPromise) {

    return new Promise((res, rej) => {
        setTimeout(() => {
            res(newPromise)
        }, 500)
    })
}
promise(newPromise).then((res) => {
    console.log({ object: "object" })
    console.log({ res })
    return res
}).then((newres) => {
    console.log(newres)
    return newres
}).then((a) => {
    console.log({ a })
})
    .catch(err => {
        console.log(err)//it will handle both promise error
    })

