require('dotenv').config();
var compression = require('compression');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { postInteractionHandler, getProductsHandler, getProductHandler, getRelatedHandler, getStylesHandler, getReviewsHandler, getQuestionsHandler, getAnswersHandler, postAnswerHandler, postQuestionHandler, updateHelpfulCountsForQuestion, updateHelpfulCountsForAnswer, updateReportForQuestion, updateReportForAnswer, postReviewHandler, updateHelpfulCountsForReview, updateReportForReview } = require('./controller/helper.js');

app.use(bodyParser.json());
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', async (req, res) => {
  try {
    res.writeHead(200);
    res.end(await readFile("index.html"))
  } catch(err) {
    res.status(500).send(err.toString());
  }
})

//get routes
app.get('/products', getProductsHandler);

app.get('/products/:product_id', getProductHandler);

app.get('/products/:product_id/styles', getStylesHandler);

app.get('/reviews/meta/:product_id', getReviewsHandler);

app.get('/reviews/:product_id/:count/:sort', getReviewsHandler);

app.get('/qa/questions/:product_id/:count', getQuestionsHandler);

app.get('/qa/questions/:question_id/answers/:count', getAnswersHandler);

app.get('/products/:product_id/related', getRelatedHandler);


//post routes
app.post('/interactions', postInteractionHandler);

app.post('/products', (req, res) => {

});

app.post('/reviews', postReviewHandler);

app.post('/qa/questions', postQuestionHandler);

app.post('/qa/questions/:question_id/answers', postAnswerHandler);


//put routes
app.put('/products', (req, res) => {

});

app.put('/reviews/:review_id/report', updateReportForReview);

app.put('/reviews/:review_id/helpful', updateHelpfulCountsForReview);

app.put('/qa/questions/:question_id/helpful', updateHelpfulCountsForQuestion);

app.put('/qa/answers/:answer_id/helpful', updateHelpfulCountsForAnswer);

app.put('qa/questions/:question_id/report', updateReportForQuestion);

app.put('/qa/answers/:answer_id/report', updateReportForAnswer);

//add a wildcard matcher thats send back index.html
app.get('/:productId', (req, res) => {

  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') }, (err) => {
    if(err) {
      next(err);
    } else {
      console.log('Sent');
  }
  })
})

app.listen(port, () => {
  console.log(`Listening on  http://localhost:${port}`);
});


//app.get('/reviews/:product_id/:count/:page/:sort', getReviewsHandler);