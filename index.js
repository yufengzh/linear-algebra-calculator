const {Matrix, inverse, solve, QrDecomposition, LuDecomposition, CholeskyDecomposition} = require('ml-matrix');

const express = require('express');
var app = express();
  // var A = new Matrix([[1, 1], [2, 2]]);
  //  console.log(inverse(A, useSVD = true));

// var B = new Matrix([[3, 3], [1, 1]]);
// var C = new Matrix([[3, 3], [1, 1]]);
//
// const addition = Matrix.add(A, B);
// const multiplication = A.mmul(B);
//
// console.log(addition);
// console.log(multiplication);

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/multiply/:A/:B', function (req, res) {
  var first = convertJSONtoMatrix(req.params.A);
  var second = convertJSONtoMatrix(req.params.B);

  if (!first.status || !second.status) {
    res.send({status: false, error: {first, second}});
  } else {
    res.send({status: true, return: first.return.mmul(second.return)});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})


app.get('/add/:A/:B', function (req, res) {
  var first = convertJSONtoMatrix(req.params.A);
  var second = convertJSONtoMatrix(req.params.B);

  if (!first.status || !second.status) {
    res.send({status: false, error: {first, second}});
  } else {
    res.send({status: true, return: Matrix.add(first.return, second.return)});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})

app.get('/subtract/:A/:B', function (req, res) {
  var first = convertJSONtoMatrix(req.params.A);
  var second = convertJSONtoMatrix(req.params.B);

  if (!first.status || !second.status) {
    res.send({status: false, error: {first, second}});
  } else {
    res.send({status: true, return: Matrix.sub(first.return, second.return)});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})

app.get('/multiplyByNumber/:constant/:A', function (req, res) {
  var constant = req.params.constant;

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status || isNaN(constant)) {
    res.send({status: false, error: {first, constantIsNaN: isNaN(constant)

    }});
  } else {
    res.send({status: true, return: Matrix.mul(first.return, parseInt(constant))});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})

app.get('/divByNumber/:constant/:A', function (req, res) {
  var constant = req.params.constant;

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status || isNaN(constant)) {
    res.send({status: false, error: {first, constantIsNaN: isNaN(constant)}});
  } else {
    res.send({status: true, return: Matrix.div(first.return, parseInt(constant))});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})

app.get('/transpose/:A', function (req, res) {

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status) {
    res.send({status: false, error: {first}});
  } else {
    res.send({status: true, return: first.return.transpose()});
  }
//  res.send(convertJSONtoMatrix(req.params.A));
//JSON.stringify([[1, 1], [2, 2]])
  console.log(req.params);
})

app.get('/inverse/:A', function (req, res) {

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status) {
    res.send({status: false, error: {first}});
  } else {
    var inverseFirst = inverse(first.return, useSVD = true);
    res.send({status: true, return: inverseFirst});
  }

  console.log(req.params);
})


//QR Decomposition
app.get('/QRDecomposition/:A', function (req, res) {

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status) {
    res.send({status: false, error: {first}});
  } else {
    var QR = new QrDecomposition(first.return);

    // var Q = QR.orthogonalMatrix;
    // var R = QR.upperTriangularMatrix;

    res.send({status: true, return:
      {Q: QR.orthogonalMatrix, R: QR.upperTriangularMatrix}});
  }

  console.log(req.params);
})

// Cholesky Decomposition
app.get('/choleskyDecomposition/:A', function (req, res) {

  var first = convertJSONtoMatrix(req.params.A);

  if (!first.status) {
    res.send({status: false, error: {first}});
  } else {
    var cholesky = new CholeskyDecomposition(first.return);
    res.send({status: true, return:
      {L: cholesky.lowerTriangularMatrix, L_transposed: cholesky.lowerTriangularMatrix.transpose()}});
  }

  console.log(req.params);
})
// var A = new Matrix([[2, 3, 5], [4, 1, 6], [1, 3, 0]]);
// var cholesky = CholeskyDecomposition(A);
// var L = cholesky.lowerTriangularMatrix;

function convertJSONtoMatrix(string) {

  if (/^[\],:{}\s]*$/.test(string.replace(/\\["\\\/bfnrtu]/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

//    var matrix = new Matrix(JSON.parse(string));
    return {status: true, return: new Matrix(JSON.parse(string))};

  } else {

    return {status: false, return: 'json is not OK'};

  }
}

app.listen(process.env.PORT || 3000);
