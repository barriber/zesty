const path = require('path');
const EC2 = require('./utils/EC2');
const FileHandler = require('./utils/FileHanlder');

async function getRegions(filePath) {
    const regionsString = await FileHandler.readFileAsync(filePath);
    const regionsArray = regionsString.split(',').map(region => region.trim());

    return regionsArray;

}
async function writeEc2Instances() {
    const regionsPath = path.join(__dirname, '../regions.txt');
    const regions = await getRegions(regionsPath)
    const ec2 = new EC2();
    const instancesArray = await Promise.all(regions.map(region => ec2.getEc2Instances(region)));
    const instances = [].concat(...instancesArray);
    const instancesWithParsedDate = instances.map(instance => ({...instance, launchTimeParsed:  new Date(instance.LaunchTime).getTime()}))
    instancesWithParsedDate.sort((instanceA, instanceB) => instanceA.launchTimeParsed - instanceB.launchTimeParsed);

    const resultPath = path.join(__dirname, '../$region_name.json');
    await FileHandler.writeToFile(resultPath, instancesWithParsedDate)
}

module.exports = { writeEc2Instances }
