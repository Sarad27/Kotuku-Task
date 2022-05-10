const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const {isSectionNameValid} = require('../helper/regex-helper');

exports.getSection = async (req,res) =>{ 
    try{
        if(isSectionNameValid(req.params.section)){
            const response = await axios.get(`https://content.guardianapis.com/${req.params.section}`,{
                params: { 'api-key' : process.env.GUARDIAN_API  } 
            });
            if(response){
                res.send(response.data.response);
            }
        }
        else{
            res.send("Section name not in format");
        }
    }catch(error){
        res.send("Couldnot find Data");
    }     

};