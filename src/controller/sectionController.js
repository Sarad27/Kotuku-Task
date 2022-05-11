const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const {isSectionNameValid} = require('../helper/regex-helper');
const {logger} = require('../helper/log-helper');

exports.getSection = async (req,res) =>{ 
    try{
        if(!isSectionNameValid(req.params.section)){
            
            logger.error(`${req.params.section} : Section name is in invalid format to process. Only lowercase letters with hyphen in between is allowed.`);
            throw new Error('Section name is in invalid format to process. Only lowercase letters with hyphen in between is allowed.');
        }
        const response = await axios.get(`https://content.guardianapis.com/${req.params.section}`,{
            params: { 'api-key' : process.env.GUARDIAN_API  } 
        });
        if(response){
            logger.info(`${req.params.section} : Section data fetched successfully.`);
            res.status(200).json(response.data.response);
        }
    }catch(e){
        res.status(422).json({ 'Error' : e.message});
    }     

};