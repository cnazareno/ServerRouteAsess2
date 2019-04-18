const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile)


class OurService {

    constructor(datafile){

        this.datafile = datafile;
    }

    async getData(){

        const data = await readFile(this.datafile, 'utf8');

        if(!data) return [];

        return JSON.parse(data).ourservices;
    }


    async getNames(){
 
        const data = await this.getData();
        return data.map((service) => {
            return {name:service.name, shortname: service.shortname};
        });

    }

    async getList(){
        const data = await this.getData();
        return data.map((service) => {
            return {name:service.name, shortname: service.shortname, title: service.title, summary: service.summary};
        });
    }

    async getListShort(){
        const data = await this.getData();
        return data.map((service) => {
            return {name:service.name, shortname: service.shortname, title: service.title};
        });
    }
    //Create the getService() function
    async getService(shortname){
        //Access all the ourservices.json data
        const data = await this.getData();
        //Find the data for the service we are after and store it in ourservices
        const service = data.find((service)=> {
            return service.shortname === shortname;
        });
        // If no data found return null
        if(!service) return null;
        //Return an object with the exact data we want
        return {
            title: service.title,
            name: service.name,
            shortname: service.shortname,
            description: service.description,
        }
    }
    
    //Create a function for getArtworkForSpeaker()
    async getOurworkForService(shortname){
        //Access all the speaker.json data
        const data = await this.getData();
        //Find the data for the speaker we are after and store it in speaker
        const service = data.find((service) => {
            return service.shortname === shortname;
        });
        //If no data found return null
        if(!service || !service.ourwork) return null;
        return service.ourwork; 
    }
    //Create a function to get all the ourwork
    async getAllOurwork(){

        //Get all the data
        const data = await this.getData();
        //Remap the data to a new array
        const ourworks = data.map((service) => {
            return service.ourwork;
        });
        

        //Create a variable to store all the artworks
        var allOurWork = [];
        
        ourworks.forEach(function(element) {
            
            allOurWork.push(...element);
        });
        
        
        return allOurWork;
        
    }
}

module.exports = OurService;
