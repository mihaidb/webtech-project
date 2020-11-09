  const express = require("express");
  const bodyParser = require("body-parser");
  const cors=require('cors')
  const Sequelize = require("sequelize");
  
  const sequelize = new Sequelize("documents", "documents_user", "tO2E5ovuwA5I", {
    host: "s1.websea.net",
    port: 13000,
    dialect: "mariadb",
  });
  
  const Document = sequelize.define("document", {
    title: Sequelize.STRING,
    type: Sequelize.ENUM('invoice','contract','other'),
    series:Sequelize.STRING(24),
    documentDate:Sequelize.DATE
  },{
    indexes:[
      {
        fields:['type']
      },
      {
        fields:['series']
      }
    ]
  });
  
  const app = express();
  
  app.use((req, res, next) => {
    console.log("Requested " + req.url);
    next();
  });
  
  app.use(cors())
  app.use(bodyParser.json());
  
  app.get("/sync", async (req, res) => {
    try {
      await sequelize.sync()
      res.status(201).json({ message: 'table created' })
    } catch (error) {
      console.warn(error)
      res.status(500).json({ message: 'Error' })
    }
  });
  
  app.get("/documents", async (req, res) => {
    try {
      const documents = await Document.findAll({})
      res.status(200).json(documents);
    } catch (error) {
      console.warn(error);
      res.status(500).json({ message: "Error" })
    }
  });
  
  app.post("/documents", async (req, res) => {
    try {
      await Document.create(req.body)
      res.status(201).json({ message: "created" });
    } catch (error) {
      console.warn(error)
      res.status(500).json({ message: "Error" })
    }
  });
  
  app.put("/documents/:id", async (req, res) => {
    try {
      const document = await Document.findByPk(req.params.bid)
      if (document) {
        document.title = req.body.title ? req.body.title : document.title
        document.content = req.body.content ? req.body.content : document.content
        document.save()
        res.status(202).json({ message: "document saved" })
      } else
        res.status(404).json({ message: "Document not found" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error" })
    }
  })
  
  app.delete("/documents/:id", async (req, res) => {
    try {
      const document = await Document.findByPk(req.params.bid)
      if (document) {
        document.destroy()
        res.status(202).json({ message: "document deleted" })
      } else
        res.status(404).json({ message: 'document not found' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error' })
    }
  })
  
  console.log("Listening");
  app.listen(8080);