const appModel = {};

appModel.post = function(data,db,callback){
    console.log(data);
    if(data.firstname === '' && data.laststname === '' && data.mobilenumber === '' && data.email === '' && data.password === '' && data.confirmpassword==='' && data.username===''){
        return callback(null,{
            status:false,
            message:"All spaces should be filled"
        })
    
    db.collection('SignupData').insertOne(data,function(error,response){
        if (error){
            return callback(err);
        }
    })
    db.collection('loginDetails').insertOne({'username':data.email,'password':data.password},function(error,response){
        if (error){
            return callback(err);
        }
    })
    console.log("succesfull stored");
    return callback({
        status:true,
        Message:"SignUp SuccessFull..!"
    })
  }

}


module.exports = appModel;