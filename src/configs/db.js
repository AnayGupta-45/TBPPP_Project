import {connect} from "mongoose"

const dbConnect = async () => {
    try {

        const mongodbConnection = await connect(process.env.MONGODB_URL);
        console.log(`Database Connected: ${mongodbConnection}.connection.host`);
        
    } catch (error) {
        console.log(`Databse Connection Error: ${error}`);
        process.exit(1);        
    }
}

export default dbConnect;