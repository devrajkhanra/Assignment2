/* 
dependencies
*/
const http = require('http')
const { randomFetch, generateUserDetails } = require('./lib/helper')


/* 
call helper methods to get user data
*/
const execHelpers = async () => {

    const response = await randomFetch(10)
    const generateUser = generateUserDetails(response)
    // console.log(generateUser)
    return generateUser
}

/* 
create server
check for url '/users'
send json response
*/
const server = http.createServer(async (req, res) => {
    if (req.url === '/users') {
        const execHelp = await execHelpers()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(execHelp))
    } else {
        res.writeHead(404);
        res.end();
    }
})

/* 
listen to server
*/
server.listen(3000, (err) => {
    if (!err) {
        console.log(`Server is running on PORT: 3000`)
    } else {
        console.log(`${err}`)
    }
})



// 10 times
/* const fetchAPI = async () => {
    const apiUrl = 'https://randomuser.me/api/'
    const responses = []

    for (let i = 0; i < 10; i++) {
        try {
            const response = await axios.get(apiUrl)
            responses.push(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return responses
}
 */

