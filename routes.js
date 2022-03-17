const router = require("express").Router();
const Movie = require("./db");

router.use((req, res, next) => {
    console.log(req.method, req.url ,new Date());
    next();
});

router.get("/", (req, res) => {
    res.send("Hello, my name is Adil!");
});

router.get("/getAll", (req, res) => {
    Movie.find().then((results) => {
        return res.json(results);
    }).catch(err => next({status: 400, message: err.message}))
});

router.get("/get/:id", (req, res) => {
    const id = req.params.id;
    Movie.findById(id).then((results) => {
        return res.json(results);
    }).catch(err => next({status:400, message: err.message}))
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndDelete(id).then((results) => {
        res.status(204).send("Deleted record successfully!");
    }).catch(err => next({status: 400, message: err.message}))   
})

router.post("/create", (req, res, next) => {
    const movie = req.body;
    new Movie(movie).save().then(() => {
        res.status(201).send("Added record successfully!");
    }).catch(err => next({status: 400, message: err.message}))    
});

router.put("/update/:id", (req, res)  => {
    const id = req.params.id;
    const body = req.body;
    Movie.findByIdAndUpdate(id, body).then((results) => {
        return res.json(results);
    }).catch(err => next({status: 400, message: err.message})) 
});

module.exports = router;