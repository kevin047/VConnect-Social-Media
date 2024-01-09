import mongoose from "mongoose"

const connectDBase = (url)=>{
    return mongoose.connect(url)    
}
export default connectDBase;
