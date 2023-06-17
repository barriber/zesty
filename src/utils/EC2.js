const {EC2Client, DescribeInstancesCommand} = require("@aws-sdk/client-ec2");

class EC2 {
    constructor() {
        this.endpoint = 'http://localhost:4000';
        this.accessKeyId = 'xxx'; // todo secret => move to env variable
        this.secretAccessKey = 'xxx'; // todo secret => move to env variable
    }

    getEc2Client(region) {
        return new EC2Client({
            endpoint: this.endpoint,
            region: region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey
            }
        });
    }

    extractInstancesFromSdk(response) {
        const ec2Instances = [];
        response.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                ec2Instances.push(instance)
            })
        })

        return ec2Instances;
    }

    async getEc2Instances(region) {

        const ec2Client = this.getEc2Client(region);
        const command = new DescribeInstancesCommand({});
        const sdkResponse = await ec2Client.send(command);
        const instances = this.extractInstancesFromSdk(sdkResponse);

        return instances;
    }
}

module.exports = EC2;
