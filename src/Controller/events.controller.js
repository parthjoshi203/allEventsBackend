const EventModel = require('../Model/eventModel');
const ResponseWrapper=require('../helper/responseWrapper');



class EventController{
  
  static addEvent = async (req, res) => {
    const resWrapper= new ResponseWrapper(res);
    try {
      const event = new EventModel(req.body);
      const savedEvent=await event.save();
      resWrapper.created(savedEvent);
    } catch (error) {            
      resWrapper.internalError(error.message);
    }
  } 

  static getEvents = async (req, res) => {
    const resWrapper= new ResponseWrapper(res);
    try {    
      const events = await EventModel.find();

      resWrapper.ok(events);
    } catch (error) {            
      resWrapper.internalError(error.message);
    }
  } 
};

module.exports = {
    EventController
};
