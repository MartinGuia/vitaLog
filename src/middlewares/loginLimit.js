import rateLimit from "express-rate-limit";

// Limitar intentos de login: 5 intentos por IP cada 5 minutos
export const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5, // Máximo 5 intentos por IP
    message: {
        success: false,
        message: "Demasiados intentos fallidos. Intenta de nuevo en 5 minutos.",
    },
    standardHeaders: true, // Muestra los headers RateLimit
    legacyHeaders: false, // Deshabilita los headers antiguos
});