import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  Navbar,
  Welcome,
  Services,
  About,
  Newsletter,
  Review,
  Contact,
  Footer,
} from "./Home/index";

library.add(fas, far);

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="gradient-bg-services" id="home">
        <Welcome />
      </section>

      <Services />

      <About />

      <Newsletter />

      <Review />

      <Contact />

      <Footer />
    </div>
  );
};

export default Home;
