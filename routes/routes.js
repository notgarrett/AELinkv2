import { addOneProfile, getAllProfiles } from "../controllers/routeControllers";

const routes = (app) => {
  // User Profiles Routing ///////////////////////////////////////////
  /////////////////////////////////////////

  app.route("/profiles/").get(getAllProfiles).post(addOneProfile);

  app
    .route("/profiles/:profile")
    .get((req, res) => {})
    .put((req, res) => {});
};

export default routes;
