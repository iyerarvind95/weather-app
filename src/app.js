const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define Path to Express Config
const viewDirectory = path.join(__dirname, "../templates/views");
const publicDirectory = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Staic directory to server
app.use(express.static(publicDirectory));

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewDirectory);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "David Mea"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Alienwear Setup",
    name: "Andrew Sya"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help and Support",
    team: "HIS"
  });
});

app.get("/forecast", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address"
    });
  }

  console.log(req.query);
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("Port started" + port);
});
