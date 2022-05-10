const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.getSection = async (req,res) =>{ 
    try{
        const response = await axios.get(`https://content.guardianapis.com/${req.params.section}`,{
            params: { 'api-key' : process.env.GUARDIAN_API  } 
        });
        if(response){
            res.send(response.data.response);
        }
    }catch(error){
        res.send("Couldnot find Data");
    }     

};