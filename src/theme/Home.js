import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, {useState } from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import DialogModal from './modules/components/DialogModal';

function Index() {

  const [show, setShow] = useState(0);

  return (
    <React.Fragment>
      {window.innerWidth <= 740 ? <AppAppBar /> : null}
      <ProductHero show={show} setShow={setShow} />
      <ProductValues />
      {/* <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA /> */}
      <ProductSmokingHero show={show} setShow={setShow}/>
      <DialogModal show={show} setShow={setShow} />
      <AppFooter />

    </React.Fragment>
  );
}

export default withRoot(Index);
