const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.getSection = async (req,res) =>{ 
    try{
        const section = /^[a-z]+(-[a-z]+)*$/.test(req.params.section);
        if(section){
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