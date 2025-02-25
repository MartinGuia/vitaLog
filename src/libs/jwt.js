import config from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.SECRET_KEY,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
