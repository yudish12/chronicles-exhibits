import mongoose, { models } from "mongoose";

const portfolioSchema = new mongoose.Schema(
    { 
        image : {
        type :String
        },
        heading : {
            type: String,
        },
        description: {
            type : String
        }
    },
    {
        timestamps : true , 
    }     
)
   

const Portfolio = mongoose.models.portfolio || mongoose.model("portfolio", portfolioSchema);

export default Portfolio
