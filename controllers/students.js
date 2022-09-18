const Student = require('../models/student');

module.exports = {
  index,
  addFact,
  delFact
};

function index(req, res) {
  Student.find({}, function(err, students) {
    res.render('students/index', { students });
  });
}

function addFact(req, res) {
  
}

function delFact(req, res) {

}
