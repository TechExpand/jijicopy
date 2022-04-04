
const express = require('express')
const router = express.Router();
const {google} = require("googleapis");







router.get('/getsheet',async function(req, res, next){

    const auth  = new google.auth.GoogleAuth(
        {
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        }
    )
    
    
    const client = await auth.getClient()

    const sheet = google.sheets({version: "v4", auth: client})

    const spreadsheetId = "1J-WKguGAZFonP6gVTmTqdclnwOSw8Swnvg8I6OLTtMY";

    const sheetdata = await sheet.spreadsheets.values.get({
   auth,
   spreadsheetId,
  range: "Sheet1",
    })

  let  newData = []

    sheetdata.data.values.map((e, index)=>{
        if(index === 0 ){

        }else{
            newData.push({
                dateAdded: e[0],
                title:  e[1],
                artist: e[2],
                url: e[3],
            })
        }
    })

     res.send(newData)
})



module.exports = router;