const CustomerSchema = require('../model/CustomerSchema');

const create = (req,res)=>{
    const customer = new CustomerSchema({
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary,
    });
    customer.save().then(response=>{
        res.status(201).json({'message':'customer saved!'});
    }).catch(error=>{
        res.status(500).json(error);
    });
}
const findById = (req,res)=>{
    CustomerSchema.findOne({'_id': req.params.id}).then(selectedObj=>{
        if (selectedObj!=null){
            res.status(200).json({'message':selectedObj});
        }
        return  res.status(404).json({'message':'customer not found'});

    })
}
const update = async (req,res)=>{
    const updateData = await CustomerSchema.findOneAndUpdate({'_id': req.params.id},{
        $set:{
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary,
        }
    },{new : true});

    if (updateData){
        return res.status(200).json({'message':'updated'});
    }else {
        return res.status(500).json({'message':'internal server error'});
    }
}
const deleteById = async (req,res)=>{
    const deleteData = await CustomerSchema.findOneAndDelete({'_id': req.params.id});

    if (deleteData){
        return res.status(204).json({'message':'deleted'});
    }else {
        return res.status(500).json({'message':'internal server error'});
    }
}
const findAll = (req,res)=>{
    try{
       const {searchText , page=1 , size=10}=req.query;

       const pageNumber = parseInt(page);
       const pageSize = parseInt(size);

       const query= {};
       if (searchText){
           query.$text= {$search:searchText};
       }
       const skip = (pageNumber-1)*pageSize;

        const data = CustomerSchema.find(query)
            .limit(pageSize)
            .skip(skip);
       return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
}

module.exports={
    create,findById,update,deleteById,findAll
}