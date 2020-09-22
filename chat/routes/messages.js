var express = require("express");
var router = express.Router();

const Joi = require("joi");
const Message = require("../models/messages");

const schema = Joi.object().keys({
  author: Joi.string()
    .regex(/[a-zA-Z]\s[a-zA-Z]/)
    .required(),
  message: Joi.string().min(5).required(),
});

router.get("/", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  Message.create({
    author: req.body.author,
    message: req.body.message,
  }).then((result) => {
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  Message.findByPk(req.params.id).then((response) => {
    if (response === null)
      return res
        .status(404)
        .send("The message with the given ts was not found");
    res.send(response);
  });
});

router.put("/:id", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  Message.update(req.body, { where: { ts: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0)
        res.send({ message: "The message was successfully updated" });
      else
        res
          .status(404)
          .send({
            message: "Something happned ! : The message was not updated",
          });
    }
  );
});

router.delete("/:id", (req, res) => {
  Message.destroy({
    where: {
      ts: req.params.id,
    },
  }).then((response) => {
    if (response === 1)
      res
        .status(204)
        .send({ message: "The Message was successfully eliminated" });
    else
      res
        .status(404)
        .send({ message: "The Message that you search was not found" });
  });
});

module.exports = router;
