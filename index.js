// creating an http server
// express
// node defualt library => no

const express=require("express");
const app=express();

//creating an array of objects with info of patient and kindeys
//the first object in the array
const users=[{
    name:"John",
    //only has one unhealthy kidney right now
    kidneys: [{
        healthy:false
    }]
    
}];

//required to parse the body in json
app.use(express.json());

//need to add functionalities to make changes into this object according to requests

app.get("/",function(req,res){
    //write logic here to return number of kidneys and health
    const johnKidneys=users[0].kidneys;
    const numberOfKidneys= johnKidneys.length;

    //filter

    let numberOfHealthyKidneys= 0;
    for(let i=0;i<johnKidneys.length;i++){

        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys=numberOfHealthyKidneys +1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys-numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})

//post end point 

app.post("/",function(req,res){
    //getting the body to 'send data in the body'
    const isHealthy =req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    //since post, dont require data back
    res.json({
        msg:"Done!"
    })
})

//put request

app.put("/",function(req,res) {
    //need to update all kidneys of the user to be healthy
    for(let i=0; i<users[0].kidneys.length;i++){
        //resetting all of them to be healthy
        users[0].kidneys[i].healthy=true;

    }
    res.json({}); 
})

//delete request

app.delete("/",function (req,res){
    //have to remove all their unhealthy kidneys
    // already have written such logic above
    //put it in new array such that new one has only the healthy kidneys

    //can use filter

// only if atleast one unhealthy kidney is there do this, else return 411
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
//any time find a healthy kidney push it onto the newKidneys array
        if(users[0].kidneys[i].healthy){

            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys= newKidneys;
    res.json({msg:"done"})
}else{
    res.status(411).json({
        msg:"You have no bad kidneys"
    });
}
    })

    

function isThereAtleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){

        if(!users[0].kidneys[i].healthy){

            atleastOneUnhealthyKidney=true;
        }
    }
    return atleastOneUnhealthyKidney
}


app.listen(3001);