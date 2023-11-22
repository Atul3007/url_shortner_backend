const { UrlModel } = require("../model/urlShortner");
const shortid = require('shortid');

const updateURL=async(req,res)=>{
    try {
        const { url, customAlias, expiresAt } = req.body;
        // Validate URL
        if (!isValidUrl(url)) {
          return res.status(400).json({ error: 'Invalid URL' });
        }
      
        // Check if custom alias is provided and available
        let shortUrl;
        if (customAlias) {
          if (await isAliasTaken(customAlias)) {
            return res.status(400).json({ error: 'Custom alias is already taken' });
          }
          shortUrl = customAlias;
        } else {
          shortUrl = shortid.generate();
        }
      
        // Save URL mapping to MongoDB
        const urlDocument = new UrlModel({
          originalUrl: url,
          shortUrl,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        });
        await urlDocument.save();
      
        const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrl}`;
        res.json({ originalUrl: url, shortenedUrl });
    } catch (error) {
        console.log(error);
    }
}

const getURL=async(req,res)=>{
    try {
        const { shortUrl } = req.params;
      //  console.log(shortUrl)
        // Find the original URL from the database
        const urlDocument = await UrlModel.findOne({ shortUrl });
        res.send(urlDocument.originalUrl);
    } catch (error) {
        console.log(error);
    }
}

function isValidUrl(str) {
    const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/);
    return urlRegex.test(str);
  }
  
  async function isAliasTaken(alias) {
    const existingUrl = await Url.findOne({ shortUrl: alias });
    return !!existingUrl;
  }
  

module.exports={
    updateURL,
    getURL
}