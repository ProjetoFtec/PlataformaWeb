const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/recuperar-senha", authController.sendResetPasswordCode);
router.post("/validar-codigo", authController.verifyResetPasswordCode);
router.post("/atualizar-senha", authController.updatePassword);

module.exports = router;