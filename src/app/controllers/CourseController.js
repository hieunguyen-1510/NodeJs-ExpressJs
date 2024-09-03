const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    
    // [GET] /courses:slug
    show(req, res,next) {
        Course.findOne({ slug: req.params.slug})
        .then(course =>
            res.render('courses/show',{course:mongooseToObject(course)})

        )
        .catch(next);
       
    }
    // [GET] /courses/create
    create(req, res,next) {
       res.render('courses/create');
       
    }
    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEXCNACELwBS…`;
    
        const course = new Course(req.body);

        //console.log('Creating course with:', req.body);  // Debug output
        course.save()
            .then(course => {
                //console.log('Course created with slug:', course.slug);  // Log the slug
                res.redirect('/me/stored/courses');
            })
            .catch(error => {
                console.error('Error creating course:', error);
                res.status(500).send('There was an error creating the course');
            });
    }
    
      // [GET] /courses/:id/edit
    edit(req, res,next) {
        Course.findById(req.params.id)
            .then(course => 
                res.render('courses/edit',{
                    course: mongooseToObject(course)}
            ))
           .catch(next); 
     } 
     // [PUT] /courses/:id
     update(req, res, next) {
        Course.updateOne({_id: req.params.id},req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
     }
    
      // [DELETE] /courses/:id

     destroy(req,res,next){
        Course.delete({_id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next);
     }
     // [DELETE] /courses/:id/force
     forceDestroy(req,res,next){
        Course.deleteOne({_id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next);

     }
     // [PATCH] /courses/:id/restore
     restore(req,res,next){
        Course.restore({_id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next);

     }
    
     
}

module.exports = new CourseController();
