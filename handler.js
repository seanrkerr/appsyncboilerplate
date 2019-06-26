"use strict";
const AWS = require("aws-sdk");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    port: "3306",
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(function() {
    console.log("Done! ");
  })
  .catch(err => {
    console.log('the error:: ', err);
  })
  .done();

const Hello = sequelize.define(
  "hello",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    tableName: "hello"
  }
);

Hello.sync();



module.exports.handler = async (event, context, callback) => {
  const { field, arguments: args } = event;
  
  switch (field) {
    case "getHellos":
      const hello = await Hello.findAll({
        raw: true
      });

      callback(null, hello);
    break;
    case "addHello":
      const {
        arguments: { message }
      } = event;
      try {
        const hello = await Hello.create({ message });
        callback(null, hello.get({ plain: true }));
      } catch (err) {
        console.log('something happened', err)
        callback(err, null);
      }
      break;
   
    default: {
      callback('An error occured', null);
      break;
    }
  }
};
