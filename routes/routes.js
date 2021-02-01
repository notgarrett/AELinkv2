import {
  addOneProfile,
  getAllProfiles,
  getOneProfiles,
  getOneVerificationCode,
  getVerificationCodes,
  getPrettyData,
} from "../controllers/routeControllers";

const routes = (app) => {
  // User Profiles Routing ///////////////////////////////////////////
  /////////////////////////////////////////

  app.route("/profiles/").get(getAllProfiles).post(addOneProfile);

  app
    .route("/profiles/:RobloxId")
    .get(getOneProfiles)
    .put((req, res) => {});

  app.route("/verification/").get();

  app.route("/verification/:VerificationKey").get(getOneVerificationCode);

  app.route("/pretty").get(getPrettyData);
};

export default routes;
