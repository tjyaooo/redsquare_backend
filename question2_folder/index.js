const express = require('express');
const crypto = require('crypto');
const app = express();

//sha - secure hash algorithm
//The hash.digest() method calculates all the data that needs to be hashed passed inside the hash function and returns them.
//If an encoding is defined, a string will be returned, else a buffer is returned.
//irreversible, as of all hash algorithms, provided you know the algorithm, where you can brute force reverse-guess?

app.get('/epone', function(req, res){
    try{
        const randData = crypto.randomBytes(256)
        const hashAlg = crypto.createHash('sha256')
        hashAlg.update(randData)
        const hash  = hashAlg.digest('hex')
        setTimeout(() => {
            res.status(200).json({
                message:"successful",
                payload:hash
            });
        }, 1000);
    } catch (err) {
        res.status(500).send('Error in generating sha256 hash');
    }
});


app.listen(5000, ()=>{
    console.log(`Server is now listening at port 5000`);
})