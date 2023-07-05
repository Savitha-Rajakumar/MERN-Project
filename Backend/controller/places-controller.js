const HttpError = require("../model/http-error");
const uuid=require('uuid');
const {validationResult}=require('express-validator')
let dummy_data = [
  {
    id: "p1",
    title: "Silicon city",
    place: "Banglore",
    creator: "u1",
  },
];

const getPlaceByid = (req, res, next) => {
  const placeid = req.params.pid;
  const place = dummy_data.find((p) => {
    return p.id === placeid;
  });
  console.log("test");
  if (!place) {
    throw new HttpError("Could not find place for provided id", 500);
    /*  error.code=500
    next(error); */
  }
  res.json(place);
};

const getPlaceByUser = (req, res, next) => {
  const userid = req.params.uid;
  const user = dummy_data.find((u) => {
    return (u.id = userid);
  });
  res.json(user);
};

const createPlace = (req, res, next) => {
 const errors= validationResult(req)
 if(!errors.isEmpty()){
   throw new HttpError('Invalid input,Please check your data',422)
 }
  const { title, place, creator } = req.body;
  const place1 = {
    id:uuid.v4(),
    title,
    place,
    creator,
  };
  dummy_data.push(place1);
  res.status(200).json({place1});
};
const updatePlace = (req, res, next) => {
  const { title, place } = req.body;
  const placeid = req.params.pid;
  const updatedplace={...dummy_data.find(p=>p.id===placeid)}
  const placeindex=dummy_data.findIndex(p=>p.id===placeid);
  updatedplace.title=title;
  updatedplace.place=place;
  dummy_data[placeindex]=updatedplace;

  res.status(200).json({data:updatedplace})

};
const deletePlace = (req, res, next) => {
    const placeid=req.params.pid;
    if(!dummy_data.find(p=>p.id===placeid)){
     throw new HttpError('Place not found',404);
    }
     dummy_data=dummy_data.filter(p=>p.id !==placeid)
    res.status(201).json({message:'Deleted'})
};

exports.getPlaceByid = getPlaceByid;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
