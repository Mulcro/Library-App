const express =require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES = require("../../config/roles");

router.route("/")
    .get(verifyRoles(ROLES.Admin),userController.getUsers);
    
router.route("/:username")
    .get(userController.getUser)
    .patch(verifyRoles(ROLES.Editor,ROLES.Admin),userController.updateUser)
    .post(verifyRoles(ROLES.Editor,ROLES.Admin),userController.returnBook)
    .delete(verifyRoles(ROLES.Admin),userController.deleteUser);

router.route("/:username/addrole")
    .patch(verifyRoles(ROLES.Editor,ROLES.Admin),userController.addRole);

router.route("/:username/deleterole")
    .patch(verifyRoles(ROLES.Admin),userController.deleteRole);

router.route("/:username/changepwd")
    .patch(userController.updatePassword);

module.exports = router;