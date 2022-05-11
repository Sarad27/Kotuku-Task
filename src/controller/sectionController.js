const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const {isSectionNameValid} = require('../helper/regex-helper');
const {logger} = require('../helper/log-helper');
const {appCache} = require('../helper/cache-helper');
const {generateRss} = require('../helper/rss-helper');

exports.getSection = async (req,res) =>{ 
    try{
        //Checking validity of section parameter passed
        if(!isSectionNameValid(req.params.section)){
            logger.error(`${req.params.section} : Section name is in invalid format to process. Only lowercase letters with hyphen in between is allowed.`);
            throw new Error('Section name is in invalid format to process. Only lowercase letters with hyphen in between is allowed.');
        }
        //Checking if the data is already cached
        if(appCache.has(req.params.section)){
            logger.info(`${req.params.section} : Section data fetched successfully.`);
            const cahcedData = appCache.get(req.params.section);
            res.set('content-type', 'text/xml');
            res.status(200).send(cahcedData);
        }else{
            const response = await axios.get(`https://content.guardianapis.com/${req.params.section}`,{
                params: { 'api-key' : process.env.GUARDIAN_API  } 
            });
            if(response){
                logger.info(`${req.params.section} : Section data fetched successfully.`);
                const rssData = generateRss(response.data.response);
                appCache.set(req.params.section, rssData);
                res.set('content-type', 'text/xml');
                res.status(200).send(rssData);
            }
        }
    }catch(e){
        res.status(422).json({ 'Error' : e.message});
    }     

};