//1. Add the following code then open server>index.js
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class PersonaliseService {
  constructor(datafile) {
    
    this.datafile = datafile;
    
  }

  async getList() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }

  async getUsersFavouriteService(shortname){
    const data = await this.getData();
    const user = data.users.find((user) => {
        return user.shortname === 'Chandra_Nazareno';
    });

    if(!user || !user.mostviewedService) return null;
    return user.mostviewedService; 
  }
}

module.exports = PersonaliseService;