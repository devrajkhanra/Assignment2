/* 
dependencies
*/
const axios = require('axios')

/* 
container
*/
const helpers = {}


/* 
fetch url 10 times for random data
required data: url
store in it one array
return the array
*/
helpers.randomFetch = async (times) => {
    // url
    const API_URL = `https://randomuser.me/api/?results=${times}`

    // container for storing the object
    try {
        const response = await axios.get(API_URL) // get api response
        return response.data.results
    } catch (error) {
        console.log('Error fetching data')
    }
}


/* 
generate response object with 
name: title + firstname + lastname
dob: dateofbirth in YYYY-MM-DD format
email: email
required: url response
*/
helpers.generateUserDetails = (urlResponse) => {

    const userDetail = []
    // loop through the array
    for (const iterator of urlResponse) {

        // slice year, month, day from date and store in a variable
        const year = (iterator.dob.date).slice(0, 4)
        const month = (iterator.dob.date).slice(5, 7)
        const day = (iterator.dob.date).slice(8, 10)
        const date = `${year}-${month}-${day}`

        // create user object and push it in the array
        userDetail.push(Object.assign({
            'Name': `${iterator.name.title} ${iterator.name.first} ${iterator.name.last}`,
            'DOB': `${date}`,
            'Email': `${iterator.email}`
        }))
    }

    return userDetail
}
module.exports = helpers