import mongoSanitize from "mongo-sanitize";
import validator from "validator";

const sanitizeInput = (req, res, next) => {
  for (let key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = mongoSanitize(req.body[key]); // Evita inyecciones NoSQL
      req.body[key] = validator.escape(req.body[key]); // Escapa caracteres peligrosos
      req.body[key] = validator.trim(req.body[key]); // Elimina espacios en blanco innecesarios
    }
  }
  next();
};

export default sanitizeInput;