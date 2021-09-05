const sss = require('shamirs-secret-sharing')
const secret = Buffer.from('secret')
const shares = sss.split(secret, { shares: 3, threshold: 2 })
const recovered = sss.combine(shares.slice(1, 3))
console.log(recovered.toString()) 

// console.log(shares[0])
// // const shares = [];
// // shares[0]= Buffer.from([8,1,196,164,79,116,155,233,141,122,157,221,192,113,100,84,53,247]);
// // console.log(shares[0])
// // shares[1]= Buffer.from([8,2,108,160,198,92,56,227,197,213,47,33,216,0,246,60,46,154]);
// // shares[2]= Buffer.from([8,3,81,241,209,156,176,36,138,86,186,168,93,67,172,42,95,134])


