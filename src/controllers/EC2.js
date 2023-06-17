const path = require("path");

class EC2 {

    fetchInstances() {
        const instancePath = path.join(__dirname, '../../$region_name.json');
        const instancesFile = require(instancePath)

        return instancesFile
    }
    async getInstancesByRegion(req, res) {
        try {
            this.fetchInstances();
        } catch (e) {
            return res.status(500).json({ error: 'Failed to fetch instances' });
        }

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