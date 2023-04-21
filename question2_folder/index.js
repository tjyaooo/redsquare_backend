const express = require('express');
const crypto = require('crypto');
const app = express();

//sha - secure hash algorithm
//The hash.digest() method calculates all the data that needs to be hashed passed inside the hash function and returns them.
//If an encoding is defined, a string will be returned, else a buffer is returned.
//irreversible, as of all hash algorithms, provided you know the algorithm, where you can brute force reverse-guess?
//SHA256 produces a string of 32 bytes. This string is usually represented in the hexadecimal format (as 64 characters [0-9a-f])
//the 256 in the name stands for the final hash digest value, i.e. irrespective of the size of plaintext/cleartext, the hash value will always be 256 bits.
app.get('/epone', function(req, res){
    try{
        const randData = crypto.randomBytes()
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

app.get('/eptwo', async function(req, res) {
    try {
      while (true) {
        const response = await fetch('http://localhost:5000/epone');
        if (response.status === 200) {
          const hashStr = (await response.json()).payload;
          const lastChar = hashStr[hashStr.length - 1];

          // checking condition: if lastChar is a characer, not a number, fetch epone again.
          if (isNaN(Number(lastChar))) {
            continue;
          } else{
            let num = Number(lastChar)
            // checking condition: need to ensure that it is an odd number
            if (num % 2 === 1){
                res.status(200).json({
                    message: "successful, last char is an odd number",
                    payload: lastChar
                  });
                break;
            } else{
                continue;
            }
          }
        } else {
          res.status(500).send('Error in getting epone response');
          break;
        }
      }
    } catch (err) {
      res.status(500).send('Error in validating hashing mechanism');
    }
  });


app.listen(5000, ()=>{
    console.log(`Server is now listening at port 5000`);
})