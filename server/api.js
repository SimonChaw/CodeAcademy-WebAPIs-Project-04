const express = require('express');
const apiRouter = express.Router();
const db = require('./db');

//MINIONS
//GET
apiRouter.get('/minions', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

apiRouter.get('/minions/:id', (req, res, next) =>{
  const minion = db.getFromDatabaseById('minions', req.params.id);
  if(minion){
    res.send(minion);
  }else{
    res.status(404).send('Minion not found.');
  }
});

apiRouter.post('/minions', (req, res, next) =>{
  const newMinion = req && req.body;
  if(newMinion.name){ // && newMinion.title && newMinion.salary && newMinion.weaknesses  - according to npm test only name is needed
    db.addToDatabase('minions', newMinion);
    res.status(201).send(newMinion);
  }else{
    res.status(400).send('You tried adding a Minion... that didn\'t work..');
  }
});

apiRouter.put('/minions/:id', (req, res, next) => {
  const updatedMinion = req && req.body;
  if(updatedMinion.name && updatedMinion.title && updatedMinion.salary && updatedMinion.weaknesses){
    db.updateInstanceInDatabase('minions', updatedMinion);
    res.send(updatedMinion);
  }else{
    res.status(404).send('Minion not found.');
  }
});

apiRouter.delete('/minions/:id', (req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.params.id);
  if(minion){
    db.deleteFromDatabasebyId('minions', req.params.id);
    res.status(204).send();
  }else{
    res.status(404).send('Minion not found');
  }
});

apiRouter.get('/minions/:id/work', (req, res, next) => {
  const work = db.getFromDatabaseByRelationship('work', req.params.id, 'minionId');
  if(work){
    res.send(work);
  }else{
    res.status(404).send('Minion work not found.');
  }
});

apiRouter.post('/minions/:id/work', (req, res, next) =>{
  const newWork = req && req.body;
  if (newWork.title && newWork.description && newWork.hours && newWork.minionId) {
    db.addToDatabase('work', newWork);
    res.status(201).send(newWork);
  }else{
    res.status(400).send('Work not created');
  }
});

//IDEAS
apiRouter.get('/ideas', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

apiRouter.get('/ideas/:id', (req, res, next) => {
  const idea = db.getFromDatabaseById('ideas', req.params.id);
  if(idea){
    res.send(idea);
  }else{
    res.status(404).send('Idea not found');
  }
});

apiRouter.post('/ideas', (req, res, next) =>{
  const idea = req && req.body;
  if(idea.name && idea.weeklyRevenue && idea.numWeeks){ //description not needed
    db.addToDatabase('ideas', idea);
    res.status(201).send(idea);
  }else{
    res.status(400).send('Idea not created');
  }
});

apiRouter.put('/ideas/:id', (req, res, next) => {
  const newIdea = req && req.body;
  if(newIdea.name && newIdea.description && newIdea.weeklyRevenue && newIdea.numWeeks){
    db.updateInstanceInDatabase('ideas', newIdea);
    res.send(newIdea);
  }else{
    res.status(404).send('Idea not found');
  }
});

apiRouter.delete('/ideas/:id', (req, res, next) => {
  const idea = db.getFromDatabaseById('ideas', req.params.id);
  if(idea){
    db.deleteFromDatabasebyId('ideas', idea.id);
    res.status(204).send();
  }else{
    res.status(404).send('Idea not found');
  }
});

//MEETINGS
apiRouter.get('/meetings', (req, res, next) => {
  res.send(db.getAllFromDatabase('meetings'));
});

apiRouter.post('/meetings', (req, res, next) => {
  const meeting = db.createMeeting();
  db.addToDatabase('meetings', meeting);
  res.status(201).send(meeting);
});

apiRouter.delete('/meetings', (req, res, next) => {
  if(db.deleteAllFromDatabase('meetings')){
    res.status(204).send();
  }else{
    res.status(404).send('No meetings exist');
  }
});

module.exports = apiRouter;
