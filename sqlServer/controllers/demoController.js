const express = require('express');
const app = require('../app/app.js');
const conn = require('./conn.js');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


conn.connect(function(error){
    if(error){
        console.log("Error in connect in democontroller");
    }
    else{
        console.log("Connected successfully in democontroller");
    }
});

router.post('/login',(req,res,next)=>{
    console.log("got request 45");
    str:String;

    str="SELECT * FROM USERS WHERE PHONE='"+req.body.phone+"' AND PASSWORD='"+req.body.password+"';";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
        }else{
            if(result.length==0){
                res.status(200).json({
                    status:"failure",
                    data:null
                })
            }else{
                // console.log("query success... "+result);
                res.status(200).json({
                    status:"success",
                    data:result
                });
            }            
        }
    })    
});

router.post("/upload",(req,res,next)=>{
    
    var path = '';
     
    console.log(" images "+req.body.image);
    str:String;
    str="insert into images values('1',"+req.body.image+");";
    conn.query(str,function(error,result){
        if(error){
            console.log("error in query");
        }else{
            console.log("Success");
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })
})

router.post("/messages",(req,res,next)=>{
    console.log("username 212"+req.body.username);

    str:String;
    str="SELECT * FROM MESSAGES WHERE USERNAME='"+req.body.username+"' AND STATUS='NEW'";
    conn.query(str,function(error,result){
        if(error){
            console.log("error in query");
        }else{
            for(let i of result){
                /*here result is the array of objects of respective database type */ 
                // console.log("query success...  messages"+i.message);
            }

            conn.query("UPDATE MESSAGES SET STATUS='READ' WHERE STATUS='NEW' AND USERNAME='"+req.body.username+"';",function(error,result){
                if(error) console.log("error in query line 75");
                else console.log("messages read successfully");
            })
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })
})

router.post("/signup",(req,res,next)=>{
    console.log("signup:"+req.body.firstName);
    str:String;

    str="INSERT INTO USERS(firstname,lastname,phone,usertype,password) VALUES('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.phone+"','"+req.body.usertype+"','"+req.body.password+"');";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("signup error");
            res.status(200).json({
                status:"failure",
                data:null
            });
            
        }
        else{
            console.log("signup success ");
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })
});

router.post("/getOwnerNotifications",(req,res,next)=>{
    console.log("username 264"+req.body.phone);

    str:String;
    str="SELECT * FROM REQUEST WHERE STATUS='NEW' OR STATUS='CONFIRM' OR STATUS='DECLINE' AND OWNERID='"+req.body.phone+"';";
    conn.query(str,function(error,result){
        if(error){
            res.status(200).json({
                status:"failure",
                data:null
            });
            console.log("error in query  : 338");
        }else{
            for(let i of result){
                /*here result is the array of objects of respective database type */ 
                // console.log("query success...  messages"+i.message);
            }
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })
});

router.post("/getRenterNotifications",(req,res,next)=>{
    console.log("username 264"+req.body.phone);

    str:String;
    str="SELECT * FROM REQUEST WHERE STATUS='ACCEPTED' OR STATUS='REJECTED' AND RENTERID='"+req.body.phone+"';";
    conn.query(str,function(error,result){
        if(error){
            res.status(200).json({
                status:"failure",
                data:null
            });
            console.log("error in query  : 338");
        }else{
            for(let i of result){
                /*here result is the array of objects of respective database type */ 
                // console.log("query success...  messages"+i.message);
            }
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })
});

router.post("/sendMessage",(req,res,next)=>{
    reciever=req.body.reciever;
    sender=req.body.sender;
    message=req.body.message;
    str : String;

    console.log("data : "+sender+reciever+message);

    str="INSERT INTO MESSAGES(USERNAME,MESSAGE,SENDER) VALUES('"+reciever+"','"+message+"','"+sender+"');";
    conn.query(str,function(error,result){
        if(error){
            console.log("error in query line 95");
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("message sent");
            res.status(200).json({
                status:"success",
                data:null
            }); 
        }
    })
});

router.post("/completeProfile",(req,res,next)=>{
    str : String;



    str="SELECT * FROM AADHAR WHERE AADHAR_NO='"+req.body.aadhar+"' AND FIRSTNAME='"+req.body.user.firstName+"' AND LASTNAME='"+req.body.user.lastName+"';";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in query line 322");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            if(result.length==0){
                console.log("failure complete profile 210 ");
                res.status(200).json({
                    status:"failure",
                    data:null
                }); 

            }else{
                str="UPDATE USERS SET EMAIL='"+req.body.email+"',ADDRESS='"+req.body.address+"',PHONE2='"+req.body.phone2+"' WHERE PHONE='"+req.body.user.phone+"';";
                console.log(str);
                conn.query(str,function(error,result){
                    if(error ){
                        console.log("failure complete profile 220 ");
                        res.status(200).json({
                            status:"failure",
                            data:null
                        });
                    }else{
                        console.log("success completeprofile");
                        res.status(200).json({
                            status:"success",
                            data:null
                        });
                    }
                })
            }
             
        }
    })
});

module.exports=router;