const User = require('../models/register')

const jwt = require('jsonwebtoken')
const config = require('../config/database')
const Blog = require("../models/blog")
module.exports = (router) => {
    router.post('/register', (req, res) => {    //register user
        let user = new User({
            email: req.body.email.toLowerCase(),
            FirstName: req.body.fname,
            LastName: req.body.lname,
            password: req.body.password
        })
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    res.json({ success: false, message: 'User Already Added' })
                } else {
                    res.json({ success: false, message: 'User not saved' + err })
                }
            } else {
                res.json({ success: true, message: 'Account Registered!' })
            }
        })

    })

    router.post('/login', (req, res) => {   //login verification

        User.findOne({ email: req.body.email }, (err, user) => {

            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!user) {
                    res.json({ success: false, message: "User not Available" })
                } else {
                    const validPassword = user.comparePassword(req.body.password)
                    if (!validPassword) {
                        res.json({ success: false, message: "Password Invalid" })
                    } else {
                        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' })
                        console.log(token)
                        res.json({ success: true, message: "Success!", token: token, user: { username: user.email, FirstName: user.FirstName } })
                    }
                }
            }
        })
    })


    router.get('/allBlogs', (req, res) => {     //get all blogs
        Blog.find({}, (err, blogs) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!blogs) {
                    res.json({ success: true, message: "No Blogs Saved" })
                } else {

                    res.json({ success: true, blogs: blogs })
                }

            }
        }).sort({ '_id': -1 })
    })


    router.post('/newBlog', (req, res) => { //create  new blog
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.body.createdBy,
            link: req.body.link
        });
        blog.save((err) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                res.json({ success: true, message: "Blog Saved Successfully" })
            }
        })
    })

    router.get('/singleBlog/:id', (req, res) => {   //get single blog for edit
        Blog.findOne({ _id: req.params.id }, (err, blog) => {
            if (err) {
                res.json({ success: false, message: "Not a Valid blog Id" })
            } else {
                if (!blog) {
                    res.json({ success: true, message: "Blog Not Found---" })

                } else {
                    res.json(({ success: true, blog: blog }))
                }
            }
        })
    })

    router.put('/updateBlog', (req, res) => {
        if (!req.body._id) {
            res.json({ success: true, message: "No Blogs Id Provided" })
        }
        else {
            Blog.findOne({ _id: req.body._id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Not a Valid blog Id" })
                } else {
                    if (!blog) {
                        res.json({ success: true, message: "Blog Not Found" })
                    } else {
                        blog.title = req.body.title;
                        blog.body = req.body.body;
                        link: req.body.link
                        blog.save((err) => {
                            if (err) {
                                res.json({ success: false, message: err })
                            } else {
                                res.json({ success: true, message: "Blog updated" })
                            }
                        })
                      
                    }
                }
            })
        }
    })


    
router.delete('/deleteBlog/:id',(req,res)=>{
    console.log(req.params.id)
    if (!req.params.id) {
        res.json({ success: true, message: "No Blogs Id Provided" })
    }
    else {
        Blog.findOne({ _id: req.params.id }, (err, blog) => {
            if (err) {
                res.json({ success: false, message: "Not a Valid blog Id" })
            } else {
                if (!blog) {
                    res.json({ success: true, message: "Blog Not Found" })
                } else {
                    blog.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: err })
                        } else {
                            res.json({ success: true, message: "Blog Deleted" })
                        }
                    })
                 
                }
            }
        })
    }
})

router.put('/comment', (req, res) => {
    if (!req.body._id) {
        res.json({ success: true, message: "No Blogs Id Provided" })
    }
    else {
        Blog.findOne({ _id: req.body._id }, (err, blog) => {
            if (err) {
                res.json({ success: false, message: "Not a Valid blog Id" })
            } else {
                if (!blog) {
                    res.json({ success: true, message: "Blog Not Found" })
                } else {                    
                    blog.coments=[{
                        comment:req.body.comment,
                        commentator:req.body.createdBy
                    }]
                    blog.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err })
                        } else {
                             res.json({ success: true, message: "Blog updated" })
                        }
                    })
                  
                }
            }
        })
    }
})


    return router
}