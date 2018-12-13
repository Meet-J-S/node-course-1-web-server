const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

//middleware
app.use((request,response,next)=>
  {
      var currentTime = new Date().toString();
      var log = `${currentTime} : ${request.method} ,
      ${request.url} `;
      console.log(log);
      fs.appendFile('server.log',log + '\n',(error)=>
      {
        if(error)
        {
          console.log('Unable to append to log file.');
        }
      });
      next();
  }
);

// app.use((request,response,next) =>
//   {
//     response.render('maintenance.hbs');
//   }
// );

hbs.registerHelper('getCYear',()=>
{
  return new Date().getFullYear();
});

hbs.registerHelper('scream',(text)=>
{
  return text.toUpperCase();
});

app.get('/',
(request,response)=>
{
  response.render('home.hbs',
  {
    pageT : 'Home Page',
    nm: 'Meet Sir'
  })
});

app.get('/about',
  (request,response)=>
  {
    response.render('about.hbs',
    {
      pageT : 'About Page',
      val:(3-1)
    });
  }
);

// app.get('/maintenance',
//   (request,response)=>
//   {
//     response.render('maintenance.hbs',
//     {
//       val:'Maintenance'
//     });
//   }
// );

app.get('/bad',
  (request,response)=>
  {
    response.send(
      {
        errMsg:"Unable to Handle Request"
      }
    );
    response.send('Bad Page.');
  }
);

app.listen(3003,()=>
{
  console.log('Server is Working Fine');
});
