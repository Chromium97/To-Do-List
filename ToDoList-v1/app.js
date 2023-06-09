const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const port = 3000;
const app = express();

let items = [];
let workItems = [];

let day = date.getDay();

let navTitle = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {

    navTitle = "Work List";
    res.render('list', {listTitle: day, newListItem: items, navTitle: navTitle});
  });

app.post('/', (req, res)=>{

    let item = req.body.newItem;
    
    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
});

app.post('/clear', (req, res)=>{
    
    if(req.body.list === 'Work'){
        workItems = [];
        res.redirect('/work');
    }
    else{
        items = [];
        res.redirect('/');
    }
});

app.post('/navigate', (req, res)=>{
    
    if(req.body.list === 'Work'){
        res.redirect('/');
    }
    else{
        res.redirect('/work');
    }
});

app.get('/work', (req, res)=>{
    navTitle = "Personal List";
    let workList = "Work Day List: " + day
    res.render('list', {listTitle: workList, newListItem:workItems, navTitle: navTitle});
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});