const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const Sequelize = require("sequelize")

const sequelize = new Sequelize("documents", "documents_user", "tO2E5ovuwA5I", {
  host: "s1.websea.net",
  port: 13000,
  dialect: "mariadb",
})

const Document = sequelize.define(
  "document",
  {
    company: Sequelize.STRING(255),
    type: Sequelize.ENUM("invoice", "contract", "other"),
    series: Sequelize.STRING(24),
    documentDate: Sequelize.DATEONLY,
  },
    //indecsii dupa care caut documentele

  {
    indexes: [
      {
        fields: ["type"],
      },
      {
        fields: ["series"],
      },
    ],
  }
)

const app = express()

app.use((req, res, next) => {
  console.log("Requested " + req.url)
  next()
})

app.use(cors())
app.use(bodyParser.json())

///CRUD

//GET

app.get("/sync", async (req, res) => {
  try {
    await sequelize.sync()
    res.status(201).json({ message: "table created" })
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: "Error" })
  }
})
//functie care sa populeze serverul la pornire --> tip GET
app.get("/populate", async (req, res) => {
  try {
    const documents = [
      {
        company: "IBM S.A.",
        type: "contract",
        series: "1",
        documentDate: "2019-08-02",
      },
      {
        company: "M$ S.A.",
        type: "contract",
        series: "2",
        documentDate: "2019-12-02",
      },
      {
        company: "Genius S.R.L. - Invoice",
        type: "invoice",
        series: "FACT 001",
        documentDate: "2020-05-02",
      },
      {
        company: "Pano Plus S.R.L. - Invoice",
        type: "invoice",
        series: "FACT 002",
        documentDate: "2020-05-07",
      },
      {
        company: "Ministerul Transporturilor",
        type: "other",
        series: "10013112",
        documentDate: "2020-08-02",
      },
    ]
    for (let i in documents) {
      await Document.create(documents[i])
    }
    res.status(201).json({ message: "Database populated" })
  } catch (error) {
    console.log(error)
  }
})

app.get("/documents", async (req, res) => {
  try {
    const documents = await Document.findAll({})
    res.status(200).json(documents)
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: "Error" })
  }
})

app.post("/documents", async (req, res) => {
  try {
    await Document.create(req.body)
    res.status(201).json({ message: "document created" })
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: "Error" })
  }
})

app.put("/documents/:id", async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id)
    if (document) {
      document.company = req.body.company ? req.body.company : document.company
      document.type = req.body.content ? req.body.content : document.type
      document.series = req.body.series ? req.body.series : document.series
      document.documentDate = req.body.documentDate ? req.body.documentDate : document.documentDate
      document.url = req.body.url ? req.body.url : document.url
      await document.save()
      res.status(202).json({ message: "document saved" })
    } else {
      res.status(404).json({ message: "Document not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error" })
  }
})

app.delete("/documents/:id", async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id)
    if (document) {
      await document.destroy()
      res.status(202).json({ message: "document deleted" })
    } else {
      res.status(404).json({ message: "document not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error" })
  }
})

console.log("Listening")
app.listen(8080)
