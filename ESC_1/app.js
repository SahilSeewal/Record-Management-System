var express=require("express"),
mongoose=require("mongoose"),
passport=require("passport"),
localStratergy=require("passport-local"),
passportLocalMongoose=require("passport-local-mongoose"),
bodyParser=require("body-parser"),
methodOverride = require("method-override"),
expressSession=require("express-session"),
flash=require("connect-flash"),
upload = require('express-fileupload'),
Binary=require("mongodb").Binary,
fs=require("fs"),
path=require("path"),
nodemailer = require("nodemailer"),
moment=require("moment");


const mongoURI="mongodb://localhost:27017/company_data"
const conn = mongoose.connect("mongodb://localhost:27017/company_data",{useNewUrlParser:true})
var app=express()
app.use(methodOverride("_method"))
app.use(upload())
app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(require("express-session")({
  secret:"i have this",
  resave:false,
  saveUninitialized:false
}))
app.use(flash())
app.use(function(req,res,next){
res.locals.error=req.flash("error")
res.locals.success=req.flash("success")
next()
})
var companySchema= new mongoose.Schema({
Company:String,
DateOfEstablish:Date,
OfficeAdd:String,
City:String,
Pin:String,
State:String,
Telephone:String,
Email:String,
Website:String,
CEOName:String,
Email1:String,
Phone:Number,
IECNumber:String,
GSTIN:String,
PersonName:String, 
Designation:String,
Mobile:Number,
Email2:String,
RegType:String,
SelectComp:String,
CompanyCin:String,
DirectorName:String,
PanP:String,
ComapnyP:String,
ItemRegration:String,
PaymentD:String,
FileNo:String,
Regno:String,
regdate:Date,
Datevalid:Date,
userid:String,
pass:String,
remarks:String,
dgft:String,
time:{type:Date, default:Date.now},
curryear:String

})

var companyexportSchema=new mongoose.Schema({
company_id:String,
FileNo:String,
company:String,
month:String,
year:String,
value:Number,
item:String,
country:String
})

var Companyexport=mongoose.model("companyexport",companyexportSchema)
var approvedSchema= new mongoose.Schema({
  Company:String,
  DateOfEstablish:Date,
  OfficeAdd:String,
  City:String,
  Pin:String,
  State:String,
  Telephone:String,
  Email:String,
  Website:String,
  CEOName:String,
  Email1:String,
  Phone:Number,
  IECNumber:String,
  GSTIN:String,
  PersonName:String,
  Designation:String,
  Mobile:Number,
  Email2:String,
  RegType:String,
  SelectComp:String,
  CompanyCin:String,
  DirectorName:String,
  PanP:String,
  ComapnyP:String,
  ItemRegration:String,
  PaymentD:String,
  FileNo:{type:String,unique:true,require:true},
  Regno:String,
  regdate:Date,
  Datevalid:Date,
  userid:String,
  pass:String,
  remarks:String,
  dgft:String,
  time:{type:Date, default:Date.now},
  curryear:String,
  companyexport1:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'companyexport'
  }]
  })
  
var countrySchema= new mongoose.Schema({
  REG_NAME:String,
  COUNTRY_NAME:String
})

var Company=mongoose.model("company",companySchema)
var Approved=mongoose.model("approve",approvedSchema)
var Country=mongoose.model("countrie",countrySchema)
var panelSchema = new mongoose.Schema({
CEL:String,
EI:String,
ECO:String,
CH:String,
TE:String
         })

var groupSchema =new mongoose.Schema({
  HS_CODE:String,
  ITEM_DESC:String,
  PANEL:String,
  GROUP:String,
 
})         

var groupmasterSchema = new mongoose.Schema({
PANEL:String,
GROUP:String
})
var exportfeeSchema = new mongoose.Schema({
  year:String,
  export_fee:Number,
  upto:String,
  fee_appl:Number,
  fee_paid:Number,
  year2:String,
  balance:Number,
  year3:String,
  remark:String,
  FileNo:String
}) 

var Panel = mongoose.model("panel",panelSchema)
var Group = mongoose.model("companyitems",groupSchema)
var Group_Master=mongoose.model("group",groupmasterSchema)
var Export_Fee = mongoose.model("exportfee",exportfeeSchema)
app.get("/esc",function(req,res){
res.render("page1")
   
})
app.get("/esc1",function(req,res){
res.render("page2")
        
})
app.get("/application",function(req,res){
    res.render("application");
})  

app.post("/upload",function(req,res){
/*var b64Data=req.body.data.split(",")[1]
var buffer=new Buffer(b64Data,"base64")
console.log(buffer)
var obj={
ExportPerformance:{data:buffer,contentType:"pdf"}}
User.create(obj)
*/
Company.create({
    Company:req.body.app.name,
    DateOfEstablish:req.body.app.date,
    OfficeAdd:req.body.app.address,
    City:req.body.app.city,
    Pin:req.body.app.pin,
    State:req.body.app.state,
    Telephone:req.body.app.telephone,
    Email:req.body.app.email,
    Website:req.body.app.website,
    CEOName:req.body.app.ceon,
    Email1:req.body.app.email1,
    Phone:req.body.app.phone,
    IECNumber:req.body.app.iec,
    GSTIN:req.body.app.gst,
    PersonName:req.body.app.name1,
    Designation:req.body.app.designation1,
    Mobile:req.body.app.mobile,
    Email2:req.body.app.email2,
    RegType:req.body.app.registertype,
    SelectComp:req.body.app.companytype,
    CompanyCin:req.body.app.companycin,
    DirectorName:req.body.app.directorname,
    PanP:req.body.app.partnerpan,
    ComapnyP:req.body.app.companypan,
    ItemRegration:req.body.app.itemreg,
    PaymentD:req.body.app.pay,
    userid:req.body.app.email2,
    pass:"escdelhi",
    curryear:req.body.curryear
},function(err,data){
if(err){
    res.send("OOPS! ERROR OCCURED")
    console.log(err)
}
else{

    res.redirect("/application")
}})



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'newapplication@escindia.com',
      pass: 'newapplication'
    }
  });
  
  var mailOptions = {
    from: 'newapplication@escindia.com',
    to: req.body.app.email2,
    subject: 'Sending Email Of Confirmation',
    text: 'Thank you for your application for registration with Electronics and Computer Software Export Promotion Council (ESC). Once your application is approved, we will inform you login credentials for ESC website member Dashboard. You will be able to view your RCMC certificate and download the same.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });




  var transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'newapplication@escindia.com',
      pass: 'newapplication'
    }
  });
  
  var mailOptions1 = {
    from: 'newapplication@escindia.com',
    to: 'rcmc@escindia.com',
    subject: 'Sending Email Of New Application Recieved ',
    text: ' You have received new application for membership.'
  };
  
  transporter1.sendMail(mailOptions1, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



})

app.get("/admin",function(req,res){
Company.find({},function(err,data){
    if(!err){
    res.render("admin",{data:data})}
    else{
        console.log(err)
    }
})

})

app.get("/admin/new-application",function(req,res){
  Company.find({},function(err,data){
      if(!err){
      res.render("admin",{data:data})}
      else{
          console.log(err)
      }
  })
  
  })


app.get("/info/:id",function(req,res){
    Company.findById(req.params.id,function(err,data){
if(err){
    res.redirect("back")
}
        res.render("unique_app",{data:data})
})})
app.delete("/delete/:id",function(req,res){
  Company.findByIdAndRemove(req.params.id,function(err,data){
    if(err){
      res.send("OOPS!!! ERROR OCCURED")
    }
    else{
res.redirect("/admin")
    }
  })
})
app.get("/approve/:id",function(req,res){
  
  Company.findById(req.params.id,function(err,data){
    res.render("approve",{data:data})
  })
  
})
app.post("/approve/:id",function(req,res){



  Approved.findOne({FileNo: req.body.fileno}, {$exists: true}).exec(function(err, doc) //find if a value exists
  {     
      if(doc) //if it does
      {
          res.send("FILE NUMBER ALREADY EXIST") // print out what it sends back
      }
      else if(!doc) // if it does not 
      {
        Company.findByIdAndUpdate(req.params.id,{
          FileNo:req.body.fileno,
          Regno:req.body.registrationno,
          regdate:req.body.regdate,
          Datevalid:req.body.valid,
          remarks:req.body.remark,
          dgft:req.body.dgft
        },function(err,data){
        if(err){
          res.send("ERROR!! OCCURED")
        }
        })
        Company.findById(req.params.id,function(err,data){
          if(!err){
            Approved.create({
              Company:data.Company,
              DateOfEstablish:data.DateOfEstablish,
              OfficeAdd:data.OfficeAdd,
              City:data.City,
              Pin:data.Pin,
              State:data.State,
              Telephone:data.Telephone,
              Email:data.Email,
              Website:data.Website,
              CEOName:data.CEOName,
              Email1:data.Email1,
              Phone:data.Phone,
              IECNumber:data.IECNumber,
              GSTIN:data.GSTIN,
              PersonName:data.PersonName,
              Designation:data.Designation,
              Mobile:data.Mobile,
              Email2:data.Email2,
              RegType:data.RegType,
              SelectComp:data.SelectComp,
              CompanyCin:data.CompanyCin,
              DirectorName:data.DirectorName,
              PanP:data.PanP,
              ComapnyP:data.ComapnyP,
              ItemRegration:data.ItemRegration,
              PaymentD:data.PaymentD,
              FileNo:data.FileNo,
              Regno:data.Regno,
              regdate:data.regdate,
              Datevalid:data.Datevalid,
              userid:data.userid,
              pass:data.pass,
              remarks:data.remarks,
              dgft:data.dgft,
              curryear:data.curryear   
        
            })
          
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'newapplication@escindia.com',
                pass: 'newapplication'
              }
            });
            
            var mailOptions = {
              from: 'newapplication@escindia.com',
              to: data.Email2,
              subject: 'Sending Email Of Application Approval',
              text: 'Congratulations your application has approved.'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            
          
          
          
          }
        })
        
        Company.findByIdAndRemove(req.params.id,function(err,data){
          if(!err){
            res.redirect("/admin")
          }
          else{
          res.send("ERROR!! OCCURED")}
        })
        
        
      }
  });





  

})

app.get("/edit/:id",function(req,res){
Company.findById(req.params.id,function(err,data){
if(err){
  res.send("OOPS!! ERROR OCCURRED")
}else{
  res.render("edit",{app:data})}
})

})

app.put("/edit1/:id",function(req,res){

  Company.findByIdAndUpdate(req.params.id,{
    Company:req.body.app.name,
    DateOfEstablish:req.body.app.date,
    OfficeAdd:req.body.app.address,
    City:req.body.app.city,
    Pin:req.body.app.pin,
    State:req.body.app.state,
    Telephone:req.body.app.telephone,
    Email:req.body.app.email,
    Website:req.body.app.website,
    CEOName:req.body.app.ceon,
    Email1:req.body.app.email1,
    Phone:req.body.app.phone,
    IECNumber:req.body.app.iec,
    GSTIN:req.body.app.gst,
    PersonName:req.body.app.name1,
    Designation:req.body.app.designation1,
    Mobile:req.body.app.mobile,
    Email2:req.body.app.email2,
    RegType:req.body.app.registertype,
    SelectComp:req.body.app.companytype,
    CompanyCin:req.body.app.companycin,
    DirectorName:req.body.app.directorname,
    PanP:req.body.app.partnerpan,
    ComapnyP:req.body.app.companypan,
    ItemRegration:req.body.app.itemreg,
    PaymentD:req.body.app.pay,
    userid:req.body.app.email2,
    pass:"escdelhi"



  },function(err,data){
    if(!err){
      res.redirect("/admin")
    }
    else{
      res.send("OOP!! ERROR OCCURED")
    }
  })
})


app.get("/view-companies",function(req,res){
Approved.find({},function(err,data){
  res.render("view-company",{data:data})
})
})
  
app.get("/view-company/:fileno",function(req,res){
  //Approved.findOne({"Email2":req.params.id}).populate("companyexport").exec(function(err,data){
 Approved.findOne({"FileNo":req.params.fileno},function(err,data){
    res.render("view-company-info",{data:data})
  })
  })

app.get('/search', function (req, res, next) {
	var q = req.query.q;

	// FULL TEXT SEARCH USING $text

	// stores.find({
	// 	$text: {
	// 		$search: q
	// 	}
	// }, {
	// 	_id: 0,
	// 	__v: 0
	// }, function (err, data) {
	// 	res.json(data);
	// });

	// PARTIAL TEXT SEARCH USING REGEX

	Approved.find({
		Company: {
      $regex: new RegExp(q),
      $options: '<options>'
		}
	}, {
		_id: 0,
		__v: 0
	}, function (err, data) {
		res.json(data);
	}).limit(50);

});
app.get("/panel",function(req,res){
 Panel.find({},function(err,data){
  res.render("panel",{data:data})
 })})
 app.get("/panel/:pname",function(req,res){
  Group_Master.find({PANEL:req.params.pname},function(err,data){
   res.render("group",{data:data})
  })})

  app.get("/panel/:pname/:gname",function(req,res){
    Group.find({GROUP:req.params.gname.replace(/%2F/g, "/")},function(err,data){
     res.render("item",{data:data,p1:req.params.pname,g1:req.params.gname})
    })})
    
    app.get("/panel/:pname/:gname/:iname/:hname/:id/edit",function(req,res){

      res.render("item-edit",{panel:req.params.pname,group:req.params.gname.replace(/%2F/g, "/"),item:req.params.iname.replace(/%2F/g, "/"),hscode:req.params.hname,id1:req.params.id})
    })
app.put("/item/edit/:id",function(req,res){
  var res1 = req.body.itemn
  console.log(res1)
 
    Group.findByIdAndUpdate(req.params.id,{ITEM_DESC:res1,HS_CODE:req.body.hsc},function(err,data){
      req.flash("success","Item is successfully edited")
      res.redirect("/panel")
  })
    
    

 
})
app.delete("/panel/:pname/:gname/:iname/:hname/:id/delete",function(req,res){
 
    console.log("delete")
    Group.findByIdAndRemove(req.params.id,function(err,data){
      req.flash("success","Item is successfully removed")
      res.redirect("back")
    })

  })

  app.get("/add-item/:panel/:group",function(req,res){
res.render("add-item",{panel:req.params.panel.replace(/%2F/g, "/"),group:req.params.group.replace(/%2F/g, "/")})
  })

  app.post("/add-item/:pname/:gname",function(req,res){
    
    //res.render("add-item",{panel:req.params.panel,group:req.params.group})
  Group.create({
    HS_CODE:req.body.hsc,
    ITEM_DESC:req.body.itemn,
    PANEL:req.params.pname,
    GROUP:req.params.gname
  })
  req.flash("success","Item is successfully added")
  res.redirect("/panel")
  
    })

app.get("/company-export",function(req,res){
  Approved.find({},function(err,data){
    res.render("company-export",{data:data})
  })
})

app.get("/export-company/:fileno",function(req,res){

 Approved.findOne({"FileNo":req.params.fileno},function(err,data){
  Group.find({},function(err1,data1){
    Country.find({},function(err,data2){
      res.render("view-company-export",{data:data,data1:data1,data2:data2})
    })
    
  }) 

  })
  })

  app.post("/export-company/:companyName/:id/:fileno",function(req,res){
var month1;
if(req.body.month === "April")
{
  month1="1";
}
else if(req.body.month === "May")
{
  month1="2";
}
else if(req.body.month === "June")
{
  month1="3";
}
else if(req.body.month === "July")
{
  month1="4";
}
else if(req.body.month === "August")
{
  month1="5";
}
else if(req.body.month === "September")
{
  month1="6";
}
else if(req.body.month === "October")
{
  month1="7";
}
else if(req.body.month === "November")
{
  month1="8";
}
else if(req.body.month === "December")
{
  month1="9";
}
else if(req.body.month === "January")
{
  month1="10";
}
else if(req.body.month === "February")
{
  month1="11";
}
else if(req.body.month === "March")
{
  month1="12";
}

    Companyexport.create({
  company:req.params.companyName,
  company_id:req.params.id,
  year:req.body.year,
  month:month1,
value:req.body.value,
item:req.body.item,
country:req.body.country,
FileNo:req.params.fileno  },function(err,data1){
  Approved.findById(req.params.id,function(err,data){
    data.companyexport1.push(data1)
data.save();

  })
})
Export_Fee.create({
year:req.body.year,
export_fee:req.body.value,
upto:month1,
FileNo:req.params.fileno })
req.flash("success","Export record is successfully added")
res.redirect("back")
})


app.get("/company/:id/:page",function(req,res){
  var perPage = 10
  var page = req.params.page || 1

  Companyexport
      .find({company_id:req.params.id})
      .skip((perPage * page) - perPage)
      .limit(perPage).sort({year:1,month:1})
      .exec(function(err, company) {
          Companyexport.find({company_id:req.params.id}).count().exec(function(err, count) {
              if (err) return next(err)
              res.render('company-item-report', {
                  company: company,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
})

app.get("/view-record/:fileno",function(req,res){
  Approved.findOne({"FileNo":req.params.fileno},function(err,data){
    Group.find({},function(err1,data1){
      Country.find({},function(err,data2){
       // res.render("view-company-export",{data:data,data1:data1,data2:data2})
       Companyexport
       .find({FileNo:req.params.fileno, year:req.query.year2 })
       .sort({year:1,month:1})
       .exec(function(err, data3) {
       res.render("view-company-export",{data3:data3,data:data,data1:data1,data2:data2})
       })
      })}) })})

  app.get('/search1', function (req, res, next) {
    var q = req.query.q;
  
    // FULL TEXT SEARCH USING $text
  
    // stores.find({
    // 	$text: {
    // 		$search: q
    // 	}
    // }, {
    // 	_id: 0,
    // 	__v: 0
    // }, function (err, data) {
    // 	res.json(data);
    // });
  
    // PARTIAL TEXT SEARCH USING REGEX
  
    Group.find({
      ITEM_DESC: {
        $regex: new RegExp(q),
        $options: '<options>'
      }
    }, {
      _id: 0,
      __v: 0
    }, function (err, data) {
      res.json(data);
    }).limit(20);
  
  });

app.get("/export-fee/:fileno",function(req,res){
    
      Export_Fee.find({"FileNo":req.params.fileno}).sort({year:1,upto:1}).exec(function(err1,data2){
res.render("view-company-fee",{data2:data2})
      
    })    
})
    
app.post("/export-fee/:fileno/:year/:month",function(req,res){
    
 
  Export_Fee.findOneAndUpdate({"FileNo":req.params.fileno,"year":req.params.year,"upto":req.params.month},{fee_appl:req.body.appl ,fee_paid:req.body.paid ,balance:req.body.valu ,year2:req.body.year1 ,year3:req.body.year2 ,remark:req.body.remark },function(err,data){
    if(!err){     
    Export_Fee.find({"FileNo":req.params.fileno}).sort({year:1,upto:1}).exec(function(err1,data1){
      res.render("view-company-fee",{data2:data1})
      })}})})




  app.listen(3000,function(){
    console.log("done")
})

