const express = require('express');
const app = require('../app/app.js');
const conn = require('./conn.js');
const bodyParser=require('body-parser'); 

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.post('/getOwner',(req,res,next)=>{
    console.log("got request 45");
    str:String;

    str="SELECT firstName,lastName,phone,email,address FROM USERS WHERE PHONE='"+req.body.phone+"';";
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

router.post('/addprop',(req,res,next)=>{

    console.log("got request addprop");
    str:String;

    console.log("address : "+req.body.rent_amt);


    str="insert into property values('"+req.body.houseno+"','"+req.body.ownerid+"','"+req.body.name+"','"+req.body.bhk+"','"+req.body.street;
    str+="','"+req.body.city+"','"+req.body.landmark+"','"+req.body.state+"','"+req.body.pin+"','"+req.body.suitable+"','"+req.body.more+"','"+req.body.rent_amt+"');";
    console.log(str);

    conn.query(str,function(error,result){
        if(error){
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("add prop success");
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })

});

router.post('/editProp',(req,res,next)=>{

    console.log("got request editProp");
    str:String;

    str="update property set name='"+req.body.name+"',bhk='"+req.body.bhk+"',street='"+req.body.street;
    str+="',city='"+req.body.city+"',landmark='"+req.body.landmark+"',state='"+req.body.state+"',pin='"+req.body.pin+"',suitable='"+req.body.suitable+"',more='"+req.body.more+"',rent_amt='"+req.body.rent_amt+"' where ownerid='"+req.body.ownerid+"' and houseno='"+req.body.houseno+"';";
    console.log(str);

    conn.query(str,function(error,result){
        if(error){
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("add prop success");
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })

});

router.post('/deleteProp',(req,res,next)=>{

    console.log("got request deleteProp");
    str:String;

    for(let i of req.body.selected){
        str="delete from property where ownerid='"+req.body.ownerid+"' and houseno='"+i+"';"
        conn.query(str,function(error,result){
            if(error){
                console.log(error.message);
                // res.status(200).json({
                //     status:"failure",
                //     data:null
                // });
            }
            else{
                console.log("deleteProp success");
                // res.status(200).json({
                //     status:"success",
                //     data:null
                // });
            }
        });
        res.status(200).json({
            status:"success",
            data:null
        });
    }

    

});

router.post('/addtoWishlist',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="INSERT INTO WISHLIST VALUES('"+req.body.user.phone+"','"+req.body.prop.houseno+"','"+req.body.prop.name+"','"+req.body.prop.ownerid+"');";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
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
                    data:null
                });
            }            
        }
    })    
});

router.post('/removeFromWishlist',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="DELETE FROM WISHLIST WHERE RENTERID='"+req.body.renterid+"' AND HOUSENO='"+req.body.houseno+"';"

    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
        }else{
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })    
});

router.post('/getWishlist',(req,res,next)=>{
    console.log("got request 171");
    str:String;

    // console.log(req.body.user);

    str="SELECT * FROM WISHLIST WHERE RENTERID='"+req.body.user.phone+"';";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
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
    })    
});

router.post('/getCurrentRent',(req,res,next)=>{
    console.log("got request 171");
    str:String;

    str="SELECT * FROM RENT_INFO WHERE RENTERID='"+req.body.user.phone+"' AND STATUS='PROGRESS';";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
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
    })    
});

router.post('/endCurrentRent',(req,res,next)=>{
    console.log("got request 171");
    str:String;

    str="UPDATE RENT_INFO SET RENT_END_DATE='"+req.body.date+"',STATUS='COMPLETED' WHERE RENTERID='"+req.body.current_rent.renterid+"' AND OWNERID='"+req.body.current_rent.ownerid+"' AND HOUSENO='"+req.body.current_rent.houseno+"';";

    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
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
    })    
});

router.post('/sendRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="INSERT INTO REQUEST(rentername,renterid,houseno,name,ownerid,ownername,status,date)";

    str+=" VALUES('"+req.body.user.firstName+"','"+req.body.user.phone+"','"+req.body.prop.houseno+"','"+req.body.prop.name+"','"+req.body.prop.ownerid+"','"+req.body.owner.firstname+"',"+"'NEW','"+req.body.date+"');";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
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
                    data:null
                });
            }            
        }
    })    
});

router.post('/acceptRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="UPDATE REQUEST SET STATUS='ACCEPTED' WHERE RENTERID='"+req.body.renterid+"' AND OWNERID='"+req.body.ownerid+"' AND HOUSENO='"+ req.body.houseno+"';";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
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
                    data:null
                });
            }            
        }
    })    
});

router.post('/rejectRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="UPDATE REQUEST SET STATUS='REJECTED' WHERE RENTERID='"+req.body.renterid+"' AND OWNERID='"+req.body.ownerid+"' AND HOUSENO='"+ req.body.houseno+"';";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
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
                    data:null
                });
            }            
        }
    })    
});

router.post('/confirmRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="UPDATE REQUEST SET STATUS='CONFIRM',ARRIVAL_DATE='"+req.body.date+"' WHERE RENTERID='"+req.body.renter.phone+"' AND OWNERID='"+req.body.owner.phone+"' AND HOUSENO='"+ req.body.prop.houseno+"';";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
        }else{
            str="INSERT INTO RENT_INFO(RENTERID,HOUSENO,NAME,OWNERID,OWNER_NAME,RENTER_NAME,RENT_START_DATE) ";
            str+="VALUES('"+req.body.renter.phone+"','"+req.body.prop.houseno+"','"+req.body.prop.name+"','"+req.body.owner.phone+"','";
            str+=req.body.owner.firstName+" "+req.body.owner.lastName+"','"+req.body.renter.firstName+" "+req.body.renter.lastName+"','"+req.body.date+"');";
            // console.log("query success... "+result);
            conn.query(str,function(error,result){
                if(error){
                    console.log("error in the query");
                    console.log(error.message);
                    res.status(200).json({
                        status:"failure",
                        data:null
                    });
                }else{
                    res.status(200).json({
                        status:"success",
                        data:null
                    }); 
                }
            })
        }
    })    
});

router.post('/declineRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="UPDATE REQUEST SET STATUS='DECLINE',REASON='"+req.body.reason+"' WHERE RENTERID='"+req.body.renterid+"' AND OWNERID='"+req.body.ownerid+"' AND HOUSENO='"+ req.body.houseno+"';";
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
        }else{
            // console.log("query success... "+result);
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })    
});

router.post('/clearRequest',(req,res,next)=>{
    console.log("got request 140");
    str:String;

    str="UPDATE REQUEST SET STATUS='CLEAR' WHERE RENTERID='"+req.body.renterid+"' AND OWNERID='"+req.body.ownerid+"' AND HOUSENO='"+ req.body.houseno+"';";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
        }else{
            // console.log("query success... "+result);
            res.status(200).json({
                status:"success",
                data:null
            });
        }
    })    
});

router.post('/searchProp',(req,res,next)=>{

    console.log("got request addprop");
    str:String;

    key :String;
    key=req.body.keyword;

    console.log("address : "+key);

    str="select * from property where street like '%"+key+"%' or city like '%"+key+"%' or landmark like '%"+key+"%' or state like '%"+key+"%' or pin like '%"+key+"%' or suitable like '%"+key+"%';";
    console.log(str);

    conn.query(str,function(error,result){
        if(error){
            console.log("Error in searchProp : 109");
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("add prop searchProp");
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })

});

router.post('/getSentRequests',(req,res,next)=>{
    console.log("got request 298");
    str:String;

    str="SELECT * FROM REQUEST WHERE RENTERID='"+req.body.phone+"' AND STATUS='NEW'";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
            res.status(200).json({
                status:"failure",
                data:null
            })
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


router.post('/getRentingHistory',(req,res,next)=>{
    console.log("got request 298");
    str:String;

    // console.log(req.body.user);

    if(req.body.user.usertype=="renter")
        str="SELECT * FROM RENT_INFO WHERE RENTERID='"+req.body.user.phone+"' AND STATUS='COMPLETED';";
    else
        str="SELECT * FROM RENT_INFO WHERE OWNERID='"+req.body.user.phone+"' AND STATUS='COMPLETED';";
    
    console.log(str);
    conn.query(str,function(error,result){
        if(error){
            console.log("error in the query");
            console.log(error.message);
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
    })    
});

router.post('/allProp',(req,res,next)=>{

    console.log("got request addprop");
    str:String;

    console.log("address : "+req.body.phone);

    str="select * from property where ownerid='"+req.body.phone+"';";
    console.log(str);

    conn.query(str,function(error,result){
        if(error){
            console.log("Error in searchProp : 142");
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("all prop searchProp");
            res.status(200).json({
                status:"success",
                data:result
            });
        }
    })

});

router.post('/getProp',(req,res,next)=>{

    console.log("got request addprop");
    str:String;

    console.log("address : "+req.body.phone);

    str="select * from property where ownerid='"+req.body.phone+"' and houseno='"+req.body.houseno+"';";
    console.log(str);

    conn.query(str,function(error,result){
        if(error){
            console.log("Error in searchProp : 142");
            res.status(200).json({
                status:"failure",
                data:null
            });
        }
        else{
            console.log("all prop searchProp");
            res.status(200).json({
                status:"success",
                data:result
            });
            conn.query("UPDATE NOTIFICATION SET STATUS='OLD' WHERE STATUS='NEW' AND OWNERID='"+req.body.phone+"';",function(error,result){
                if(error) console.log("error in query getprop");
                else console.log("messages read successfully");
            });
        }
    })

});

router.get('/',(req,res,next)=>{
    console.log('inside prop controller');
    res.status(200).json("login");
})


module.exports=router;