const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')

const app = express()
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
app.use (express.static(publicdirectorypath))
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        titel : 'weather ',
        name : 'andrew mead'
    })
})

app.get('/about',(req,res)=>{
  res.render('about',{
      titel : 'about me',
      name : ' andew mead'
  })
})

app.get ('/help',(req,res)=>{
    res.render('help',{
             helptext : 'this is sime g=page',
             titel: 'help',
             name : ' andrew mead'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'you must provid an address'
        })
    } 
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
      if (error){
          return res.send({ error })
      }
      forecast(latitude,longitude,(error,forecastdata)=>{
          if (error){
              return res.send({error})
          }
          res.send({
              forecast : forecastdata,
              location,
              address: req.query.address
          })
      } )
    })

})


app.get('/product',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error: 'you must provid search'
        })
    }
    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        titel : '404',
        name : ' vaibhav ',
        error: ' help is not found'
    })
})

app.get('*',(req,res)=>{
 res.render('404',{
     titel: '404',
     namr :  'vaibhav',
     error:'page not found'
 })
})

 app.listen(3000,()=>{
     console.log('lisining on port 3000')
  })