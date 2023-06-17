const instancesFile = require('../$region_name.json')
class EC2 {
    async getInstancesByRegion(req, res) {
        const {query: { region }} = req;
        if(!region) {
            const errorMessage = 'Missing region input.';
            return res.status(400).json({ error: errorMessage });
        }

        const result = instancesFile.filter(({Placement}) => Placement.AvailabilityZone.includes(region))
        res.send(result)
    }
}

module.exports = EC2;