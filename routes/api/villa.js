const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const {Role} = require('../../middleware/authRole');
const role ={
    admin: 'admin',
    villa: 'villa',
    customer: 'customer'
}
const {
    ImageUpload,
    Me,
    AddRooms,
    CreateProfile,
    PublicMe,
    ProfileMe,
    DeleteRoom,
    LikesVilla,
    UnlikesVilla,
    GetLikesVilla,
    DeleteAll
} = require("../../controllers/villa");
//@access   Private
router.get('/me', auth, Role(role.villa),Me);
//@access Private
router.post("/", [auth,Role(role.villa),
        [
            check("villaName", "Status is required")
                .not()
                .isEmpty(),
            check("kecamatan", "Status is required")
                .not()
                .isEmpty(),
            check("contact", "Status is required")
                .not()
                .isEmpty()
        ]
    ],CreateProfile);
//@access Public

router.put('/rooms',[auth,Role(role.villa)],AddRooms)
router.get("/",PublicMe);
//@access Public
router.get("/profile/:villa_id", ProfileMe);
//@access Private
router.delete("/", auth, Role(role.villa),DeleteAll);
//@access Private
router.post("/uploadImage",auth,Role(role.villa),ImageUpload);
//@access Private
router.delete("/kamar/:kamar_id", auth,Role(role.villa), DeleteRoom);
router.put("/likes/:id", auth, LikesVilla);
router.put("/unlikes/:id", auth, UnlikesVilla);
router.get('/likes',auth,Role(role.villa), GetLikesVilla)

module.exports = router;
