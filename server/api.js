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
  if(newMinion.name && newMinion.title && Number(newMinion.salary) && newMinion.weaknesses){
    db.addToDatabase('minions', newMinion);
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
let ideas = db.getAllFromDatabase('ideas');
apiRouter.get('/ideas', (req, res, next) => {
  res.send(ideas);
});
//MEETINGS
let meetings = db.getAllFromDatabase('meetings');
apiRouter.get('/meetings', (req, res, next) => {
  res.send(meetings);
});
module.exports = apiRouter;
