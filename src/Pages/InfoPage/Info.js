import React from "react";
import { Row, Col } from "react-bootstrap";
import "./InfoPage.css";
import Animal1 from "../../Assets/Animal1.jpeg";
import Animal2 from "../../Assets/Animal2.jpeg";
import Animal3 from "../../Assets/Animal3.jpeg";
import Plant1 from "../../Assets/Plant1.jpeg"
import Plant2 from "../../Assets/Plant2.jpeg"
import Plant3 from "../../Assets/Plant3.jpeg"
const Info = () => {
  return (
    <div>
      <div className="Banner">
        <div className="Banner-welcome-box ">
          <h1>Welcome to national Park Golija!</h1>
        </div>

        <div className="Banner-Info-box">
          <h3>Elevation: 1.833m</h3>
          <h3>Area: 538km2 </h3>
          <h3>Plant Species: 900 </h3>
        </div>
      </div>

      <div className="About-Park mt-5">
        <h1>About the Park</h1>
        <p>
          Golija Mountain is located in southwestern Serbia. By beauty and
          diversity of landscapes, as well as natural and cultural preservation
          value, is one of the most beautiful mountains in Serbia. Considerable
          wealth water enabled the survival of diverse flora and fauna. The
          mountain is criss-crossed by numerous streams that have cut off gorge
          valleys. The most picturesque among them are the gorges Studenica and
          Invent. Tresave and popularly known lakes are characterized by their
          special beauty as an arena of "mountain villas", among which
          Košaninovo i Dajić Lake. This mountain is adorned with a large expanse
          of forest cover - represents the realm of the mountain maple (Ace
          heldreichii) who builds the most beautiful and best-preserved
          deciduous and coniferous-conifer forests forests in Serbia. Apart from
          the mountain maple, this mountain is also inhabited by approx 1,100
          plant species, many of which are relict or endemic characters (Allysum
          markgrafi, Allysum jancheni, Pancicia serbica, Viola elegantula,
          Vferbasaim adamovicii, Thymus adamovicii). Next to numerous species of
          mammals, such as blind dogs (Spalax leucodon), alpine shrew (Sorex
          alpinus), brown bear (Ursus arctos), wolf (Canis lupus) and the fox
          (Vulpes vulpes), almost 100 live in Golija important species of birds:
          wood lark (Lullula arborea), stone warbler (Alectoris graeca),
          red-legged warbler (Tringa totanus), red-tailed godwit (Phoenicurus
          phoenicurus) and others. In the northern part of the park, in the
          valley Studenica, there is the Studenica monastery from the 13th
          century, a cultural monument under the protection of UNESCO.
        </p>
      </div>

      {/* //Pictures */}
      <section className="Gallery mt-5">
        <h1 className="text-center">Gallery</h1>

        <Row>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Animal1} alt="Animal" />
          </Col>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Animal2} alt="Animal" />
          </Col>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Animal3} alt="Animal" />
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Plant1} alt="Animal" />
          </Col>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Plant2} alt="Animal" />
          </Col>
          <Col xs={12} md={4}>
            <img className="Fauna-Flora-Pictures" src={Plant3} alt="Animal" />
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Info;
