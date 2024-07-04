const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const userController = require("../controllers/userController");
const userlogController = require("../controllers/userlogController");
const signupdataController = require("../controllers/signupdataController");
const addbussinessController = require("../controllers/addbussinessController");
const languageController = require("../controllers/languageController");
const categoryframeController = require("../controllers/categoryframeController");
const categorypostController = require("../controllers/categorypostController");
const advertisementController = require("../controllers/advertisementController");
const marketplaceController = require("../controllers/marketplaceController");
const newsController = require("../controllers/newsController");
const adminuserController = require("../controllers/adminuserController");
const goldrateController = require("../controllers/goldrateController");
const addlocationController = require("../controllers/addlocationController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Adjust the destination folder as per your setup
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});



const fileFilter = (req, file, cb) => {
  // Check file type if needed
  // For example, only allow images

  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Invalid file type. Only image files are allowed."));
  }
  cb(null, true);
};

const upload = multer({ dest: 'uploads/' });


router.get('/uploads', express.static('D:/Poster Maker/1_Files/Backend/uploads'));

/************************************************Login******************************************************************

//*********************************************User Routes**************************************************************

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Add User
 *     description: Endpoint to add a new User
 *     responses:
 *       '200':
 *         description: User added successfully
 */
router.post("/signup", userController.signup);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all User details
 *     description: Retrieve a list of all User details
 *     responses:
 *       '200':
 *         description: A successful response with list of User
 */
router.get("/user", userController.getAllUsers);

/**
 * @swagger
 * /userbyid/{id}:
 *   get:
 *     summary: Get User details by id
 *     description: Retrieve a User details by user id
 *     responses:
 *       '200':
 *         description: A successful response with User id
 */
router.get("/userbyid/:id",userController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a User details
 *     description: Update details of a specific User details by ID
 *     responses:
 *       '200':
 *         description: User updated successfully
 */
router.put("/user/:userId", userController.updatePassword);

router.get("/users", verifyToken, (req, res) => {
  // This is a sample protected route, accessible only with a valid token
  res.json({ message: "Protected route", userId: req.userId });
});

//*****************************************************************************************************************

//************************************************Userlog Route**************************************************
/**
 * @swagger
 * /userlog:
 *   post:
 *     summary: Add Userlog
 *     description: Endpoint to add a new Userlog
 *     responses:
 *       '200':
 *         description: Userlog added successfully
 */
router.post("/userlog", userlogController.userlog);

/**
 * @swagger
 * /userlogs:
 *   get:
 *     summary: Get all Userlog details
 *     description: Retrieve a list of all Userlog details
 *     responses:
 *       '200':
 *         description: A successful response with list of Userlog
 */
router.get("/userlogs", userlogController.getAllUserLog);

/**
 * @swagger
 * /userlogs/{id}:
 *   put:
 *     summary: Update a Userlog details
 *     description: Update details of a specific Userlog details by ID
 *     responses:
 *       '200':
 *         description: Userlog updated successfully
 */
router.put("/userlogs/:id", userlogController.updateUserLog);

//*************************************************************************************************************

//*************************************************Signup data*************************************************
/**
 * @swagger
 * /signupdata:
 *   post:
 *     summary: Create Signup data
 *     description: Endpoint to create new signup data
 *     responses:
 *       '200':
 *         description: Signup data added successfully
 */
router.post("/signupdata", signupdataController.Signupdata);

/**
 * @swagger
 * /signupdatas:
 *   get:
 *     summary: Get all Signup data
 *     description: Retrieve a list of all signup data
 *     responses:
 *       '200':
 *         description: A successful response with list of signup data
 */
router.get("/signupdatas", signupdataController.getAllSignupdata);

/**
 * @swagger
 * /signupdataes/{id}:
 *   put:
 *     summary: Update a Signup details
 *     description: Update details of a specific signup data by ID
 *     responses:
 *       '200':
 *         description: signup data updated successfully
 */
router.put("/signupdataes/:id", signupdataController.updateSignupdata);

/**
 * @swagger
 * /signupdataes/{id}:
 *   delete:
 *     summary: delete a Signup details
 *     description: delete specific signup data by ID
 *     responses:
 *       '200':
 *         description: signup data delete successfully
 */
router.delete("/signupdatas/:id", signupdataController.deleteSignupdata);

//*************************************************************************************************************

//*********************************************Add Bussiness***************************************************
/**
 * @swagger
 * /addbussiness:
 *   post:
 *     summary: Create Add Bussiness
 *     description: Endpoint to create new add Bussiness type
 *     responses:
 *       '200':
 *         description: Bussiness type added successfully
 */
router.post("/addbussiness",
  upload.fields([
    { name: "upload_logo", maxCount: 1 },{ name: "footer_image", maxCount: 1 }
  ]),
  addbussinessController.AddBussiness
);

/**
 * @swagger
 * /addbussinesses:
 *   get:
 *     summary: Get all Bussinesss type
 *     description: Retrieve a list of all Bussiness type
 *     responses:
 *       '200':
 *         description: A successful response with list of bussiness type
 */
router.get("/addbussinesses", addbussinessController.getAllAddBussiness);

/**
 * @swagger
 * /addbussinesses:
 *   get:
 *     summary: Get by Id Bussinesss type
 *     description: Retrieve a Bussiness by id
 *     responses:
 *       '200':
 *         description: A successful response with bussiness by id
 */
router.get("/addbussinessesbyid/:id", addbussinessController.getAddBussinessById);

/**
 * @swagger
 * /addbussinesses/{id}:
 *   put:
 *     summary: Update a Bussiness type
 *     description: Update details of a specific bussiness type by ID
 *     responses:
 *       '200':
 *         description: Bussiness type updated successfully
 */
router.put(
  "/addbussinesses/:id",
  upload.fields([{ name: 'upload_logo', maxCount: 1 }, { name: 'footer_image', maxCount: 1 }]),
  addbussinessController.updateAddBussiness
);

/**
 * @swagger
 * /addbussinesses/{id}:
 *   delete:
 *     summary: delete a bussiness type
 *     description: delete specific bussiness type by ID
 *     responses:
 *       '200':
 *         description: Bussiness type delete successfully
 */
router.delete("/addbussinesses/:id", addbussinessController.deleteAddBussiness);

//*************************************************************************************************************

//********************************************Language Module**************************************************

/**
 * @swagger
 * /language:
 *   post:
 *     summary: Create a language
 *     description: Endpoint to create new language
 *     responses:
 *       '200':
 *         description: language added successfully
 */
router.post("/language",
  upload.fields([
    { name: "language_image", maxCount: 1 },
  ]),
  languageController.addLanguage
);

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Get all Language
 *     description: Retrieve a list of all Language
 *     responses:
 *       '200':
 *         description: A successful response with list of language
 */
router.get("/languages", languageController.getAllLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   put:
 *     summary: Update a Language
 *     description: Update details of a specific language by ID
 *     responses:
 *       '200':
 *         description: Language updated successfully
 */
router.put("/languages/:id",upload.single('language_image'), languageController.updateLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: delete a language
 *     description: delete specific lanaguage by ID
 *     responses:
 *       '200':
 *         description: language delete successfully
 */
router.delete("/languages/:id", languageController.deleteLanguage);

//************************************************************************************************************

//*********************************************Category Frame*************************************************

/**
 * @swagger
 * /categoryframe:
 *   post:
 *     summary: Create a new category frame
 *     description: Endpoint to create new category frame
 *     responses:
 *       '200':
 *         description: category frame added successfully
 */
router.post("/categoryframe", upload.fields([
  { name: "frame_image", maxCount: 1 },
]), categoryframeController.addCategoryframe);


/**
 * @swagger
 * /categoryframes:
 *   get:
 *     summary: Get all category frame
 *     description: Retrieve a list of all category frame
 *     responses:
 *       '200':
 *         description: A successful response with list of category frame
 */
router.get("/categoryframes", categoryframeController.getAllCategoryframe);

/**
 * @swagger
 * /categoryframes/{id}:
 *   get:
 *     summary: Get category frame by id
 *     description: Retrieve a list of category frame by id
 *     responses:
 *       '200':
 *         description: A successful response with list of category frame by id
 */
router.get("/categoryframesbyid/:id",categoryframeController.getCategoryframeById);

/**
 * @swagger
 * /categoryframes/{id}:
 *   put:
 *     summary: Update a category frame
 *     description: Update details of a specific category frame by ID
 *     responses:
 *       '200':
 *         description: category frame updated successfully
 */
router.put("/categoryframes/:id",
  upload.fields([{ name: 'frame_image', maxCount: 1 }, { name: 'footer_image', maxCount: 1 }]),
  categoryframeController.updateCategoryframe
);

/**
 * @swagger
 * /categoryframes/{id}:
 *   delete:
 *     summary: delete a category frame
 *     description: delete specific category frame by ID
 *     responses:
 *       '200':
 *         description: Category frame delete successfully
 */
router.delete("/categoryframes/:id", categoryframeController.deleteCategoryframe);

//************************************************************************************************************

//*********************************************Category Post**************************************************
/**
 * @swagger
 * /categorypost:
 *   post:
 *     summary: Create a new Category post
 *     description: Endpoint to create new category post
 *     responses:
 *       '200':
 *         description: category post added successfully
 */
router.post("/categorypost",
  upload.fields([
    { name: "category_image", maxCount: 1 },
  ]), categorypostController.addCategorypost
);

/**
 * @swagger
 * /categoryposts:
 *   get:
 *     summary: Get all category post
 *     description: Retrieve a list of all category post
 *     responses:
 *       '200':
 *         description: A successful response with list of category post
 */
router.get("/categoryposts", categorypostController.getAllCategorypost);

/**
 * @swagger
 * /categoryposts/{id}:
 *   put:
 *     summary: Update a category post
 *     description: Update details of a specific category post by ID
 *     responses:
 *       '200':
 *         description: category post updated successfully
 */
router.put("/categoryposts/:id",upload.single('category_image'), categorypostController.updateCategorypost);

/**
 * @swagger
 * /categoryposts/{id}:
 *   delete:
 *     summary: delete a category post
 *     description: delete specific category post by ID
 *     responses:
 *       '200':
 *         description: Category post delete successfully
 */
router.delete("/categoryposts/:id", categorypostController.deleteCategorypost);

//************************************************************************************************************

//******************************************Advertisement Routes**********************************************
/**
 * @swagger
 * /advertisement:
 *   post:
 *     summary: Create a new advertisement
 *     description: Endpoint to create new advertisement
 *     responses:
 *       '200':
 *         description: advertisement added successfully
 */
router.post('/addAdvertisement', upload.single('photo'), advertisementController.addAdvertisement);

/**
 * @swagger
 * /updateAdvertisement/{id}:
 *   put:
 *     summary: Update advertisement
 *     description: Update all advertisement
 *     responses:
 *       '200':
 *         description: A successful response with update of advertisement
 */
router.put('/updateAdvertisement/:id', upload.single('photo'), advertisementController.updateAdvertisement);

/**
 * @swagger
 * /advertisements:
 *   get:
 *     summary: Get all advertisement
 *     description: Retrieve a list of all advertisement
 *     responses:
 *       '200':
 *         description: A successful response with list of advertisement
 */
router.get("/advertisements", advertisementController.updateAdvertisement);

/**
 * @swagger
 * /advertisements/{id}:
 *   delete:
 *     summary: delete a advertisement
 *     description: delete specific advertisement by ID
 *     responses:
 *       '200':
 *         description: Advertisement delete successfully
 */
router.delete("/advertisements/:id", advertisementController.deleteAdvertisement);

//***********************************************************************************************************

//*******************************************Market Place****************************************************
/**
 * @swagger
 * /marketplace:
 *   post:
 *     summary: Create a new marketplace
 *     description: Endpoint to create new marketplace
 *     responses:
 *       '200':
 *         description: marketplace added successfully
 */
router.post("/marketplace",
  upload.fields([
    { name: "selected_image", maxCount: 1 },
  ]), marketplaceController.Marketplace
);

/**
 * @swagger
 * /marketplaces:
 *   get:
 *     summary: Get all marketplace
 *     description: Retrieve a list of all marketplace
 *     responses:
 *       '200':
 *         description: A successful response with list of marketplace
 */
router.get("/marketplaces", marketplaceController.getAllMarketplace);

/**
 * @swagger
 * /marketplaces/{id}:
 *   put:
 *     summary: Update a marketplace
 *     description: Update details of a specific marketplace by ID
 *     responses:
 *       '200':
 *         description: marketplace updated successfully
 */
router.put("/marketplaces/:id",upload.single('selected_image'), marketplaceController.updateMarketplace);

/**
 * @swagger
 * /marketplaces/{id}:
 *   delete:
 *     summary: delete a marketplace
 *     description: delete specific marketplace by ID
 *     responses:
 *       '200':
 *         description: Marketplace delete successfully
 */
router.delete("/marketplaces/:id", marketplaceController.deleteMarketplace);

//***********************************************************************************************************

//***************************************************News Routes*********************************************
/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new news
 *     description: Endpoint to create new news
 *     responses:
 *       '200':
 *         description: news added successfully
 */
router.post("/news",
  upload.fields([
    { name: "news_image", maxCount: 1 },
  ]), newsController.News
);

/**
 * @swagger
 * /newses:
 *   get:
 *     summary: Get all news
 *     description: Retrieve a list of all news
 *     responses:
 *       '200':
 *         description: A successful response with list of news
 */
router.get("/newses", newsController.getAllNews);

/**
 * @swagger
 * /newses/{id}:
 *   put:
 *     summary: Update a news
 *     description: Update details of a specific news by ID
 *     responses:
 *       '200':
 *         description: news updated successfully
 */
router.put("/newses/:id",upload.single('news_image'), newsController.updateNews);

/**
 * @swagger
 * /newses/{id}:
 *   delete:
 *     summary: delete a news
 *     description: delete specific news by ID
 *     responses:
 *       '200':
 *         description: News delete successfully
 */
router.delete("/newses/:id", newsController.deleteNews);

//***********************************************************************************************************

//*********************************************Admin Routes**************************************************
/**
 * @swagger
 * /adminsignup:
 *   post:
 *     summary: Create a Admin signup
 *     description: Endpoint to create new Admin signup
 *     responses:
 *       '200':
 *         description: Admin signup added successfully
 */
router.post("/adminsignup", adminuserController.Adminuser);

/**
 * @swagger
 * /adminusers:
 *   get:
 *     summary: Get all Admin signup
 *     description: Retrieve a list of all Admin signup
 *     responses:
 *       '200':
 *         description: A successful response with list of Admin signup
 */
router.get("/adminusers", adminuserController.getAllAdminuser);

/**
 * @swagger
 * /adminuseres/{adminuserId}:
 *   put:
 *     summary: Update a Admin signup
 *     description: Update details of a specific Admin signup by ID
 *     responses:
 *       '200':
 *         description: Admin signup updated successfully
 */
router.put("/adminuseres/:adminuserId", adminuserController.updateAdminuser);

/**
 * @swagger
 * /adminuseres/{adminuserId}:
 *   delete:
 *     summary: delete a Admin signup
 *     description: delete specific Admin signup by ID
 *     responses:
 *       '200':
 *         description: Admin signup delete successfully
 */
router.delete("/adminuseres/:adminuserId", adminuserController.deleteAdminuser);

//************************************************************************************************************

//*********************************************Gold Rate******************************************************

/**
 * @swagger
 * /goldrate:
 *   post:
 *     summary: Create a Gold rate
 *     description: Endpoint to create new Gold rate
 *     responses:
 *       '200':
 *         description: Goldrate added successfully
 */
router.post("/goldrate", goldrateController.Goldrate);

/**
 * @swagger
 * /goldrates:
 *   get:
 *     summary: Get all Goldrate
 *     description: Retrieve a list of all Goldrate
 *     responses:
 *       '200':
 *         description: A successful response with list of Goldrate
 */
router.get("/goldrates", goldrateController.getAllGoldrate);

/**
 * @swagger
 * /goldrates/{id}:
 *   put:
 *     summary: Update a Goldrate
 *     description: Update details of a specific Goldrate by ID
 *     responses:
 *       '200':
 *         description: Goldrate updated successfully
 */
router.put("/goldrates/:id", goldrateController.updateGoldrate);

/**
 * @swagger
 * /goldrates/{id}:
 *   delete:
 *     summary: delete a goldrate
 *     description: delete specific goldrate by ID
 *     responses:
 *       '200':Goldrate delete successfully
 */
router.delete("/goldrates/:id", goldrateController.deleteGoldrate);

//*************************************************************************************************************

//************************************************Add Location*************************************************

/**
 * @swagger
 * /addlocation:
 *   post:
 *     summary: Create a new location
 *     description: Endpoint to create new location
 *     responses:
 *       '200':
 *         description: location added successfully
 */
router.post("/addlocation", addlocationController.Addlocation);

/**
 * @swagger
 * /addlocations:
 *   get:
 *     summary: Get all Location
 *     description: Retrieve a list of all location
 *     responses:
 *       '200':
 *         description: A successful response with list of location
 */
router.get("/addlocations", addlocationController.getAllAddlocation);

/**
 * @swagger
 * /addlocations/{id}:
 *   put:
 *     summary: Update a Location
 *     description: Update details of a specific location by ID
 *     responses:
 *       '200':
 *         description: Location updated successfully
 */
router.put("/addlocations/:id", addlocationController.updateAddlocation);

/**
 * @swagger
 * /addlocations/{id}:
 *   delete:
 *     summary: delete a location
 *     description: delete specific location by ID
 *     responses:
 *       '200':location delete successfully
 */
router.delete("/addlocations/:id", addlocationController.deleteAddlocation);

module.exports = router;
