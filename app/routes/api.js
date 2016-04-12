var School = require('../models/school');
var Contact = require('../models/contacts');

module.exports = function(app, express)
{
	var api = express.Router();


	/**
	*     Inserting
	*/
	api.post('/add', function(req, res){
		
		
        if(typeof req.body.contacts !== 'undefined')
        {
          var contact_values = req.body.contacts.value;
	      var contact_types =  req.body.contacts.type;
        } 
		

      /**
        *   insert school
        **/
        var school = new School({
        	name: req.body.name,
        	address: req.body.address,
        	description: req.body.description
        });

        school.save(function(err){
           if(err) {
           	res.send(err);
           	return;
           }
        
        
        // insert school's contacts
        for (var k in contact_values) {
      //     console.log(school._id + " " + contact_types[k] + " " + contact_values[k]);


           var contact = new Contact({
        	    school_id: school._id,
        		type: contact_types[k],
        		value: contact_values[k]
        	}); 

        	contact.save(function(err){
        		if(err){ res.send(err); return; }
        	}); 
        }
        

           res.json({success:true, message: "School added Successfuly"});
        });
    
	});


    /**
    *   Get School
    */
	api.get('/get/:id', function(req, res){
        var school_info = {};
		School.findOne({_id: req.param('id')}, function(err, school){
			if(err){
				res.send(err);
				return;
			}
        
        school_info.school = school;  

        // get school's contacts

        Contact.find({school_id: school._id}, function(err, contacts){

           school_info.contacts = contacts;

           res.json(school_info);

        });

			
		});
	});

	/**
	*   Updating
	*/
	api.patch('/update/:id', function(req, res){
		
		var ids = req.param('ids');
		var types = req.param('types');
		var values = req.param('values');

		School.findOne({_id: req.param('id')}, function(err, school){
			if(err){
				res.send(err);
				return;
			}
            
            for(var p in req.body){
               school[p] = req.body[p];
            }
			
			school.save(function(err){
				if(err){
					res.send(err);
					return;
				}

                
                ids.forEach(function(id, index){
	               
	               Contact.findOne({_id: id}, function(err, contact){
                       console.log(id + "  " + types[index] + " " + values[index]);  

                       // update existing contacts

                       if(contact){
	                       contact.type =  types[index];
	                       contact.value = values[index];

	                       contact.save(function(err){
	                       	if(err){
	                       		res.send(err);
	                       		return;
	                       	}
	                      
	                       });
                       }else{

                       	// insert new contacts

                       	var contact = new Contact({
				        	    school_id: school._id,
				        		type: types[index],
				        		value: values[index]
				        	}); 

				        	contact.save(function(err){
				        		if(err){ res.send(err); return; }
				        	});
                       }                  
                       

					});
                });

              res.json({success: true, message: "updated!!"})
				
			});
		});
	});




	/**
	*     Deleteing
	*/
	api.delete('/delete/:id', function(req, res)
	{
		/**
        School.remove({ _id: req.param('id') }, function(err) {
		    if (err) {
		      res.send(err);
		      return;       
		    }

		    

		    res.json({success: true, message: "Deleted Successfully!" });
		    
		});
		**/

		School.findOne({ _id: req.param('id') }, function(err, school){
			if(err){
				res.send(err);
				return;
			}

			
			// remove all related contacts

			Contact.remove({school_id: school._id}, function(err){
				if(err){
					res.send(err);
					return;
				}
			});

			school.remove();
		});

	});


	api.get('/list', function(req, res){
        
        
		School.find({}, function(err, schools){
			if(err){
				res.send(err);
				return;
			}
           res.json(schools);
		});
	});


	api.get('/contacts', function(req, res){
     

		Contact
			.find()
			.populate('school_id')
			.exec(function (err, contacts) {
  				if (err) return handleError(err);
  				
  				res.json(contacts);
		});

		/**
			Contact.remove({}, function(err){
		      if(err){
				res.send(err);
				return;
			   }
			});
		**/
	});



	return api;
}
