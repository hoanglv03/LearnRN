/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PhoneRing from './src/views/phonering/PhoneRing';
import Loading from './src/views/loading/Loading';
import Switch from './src/views/switch/Switch';
import Gallery from './src/views/gallery/Gallery';
import FlatListEffect from './src/views/flatlisteffect/FlatListEffect';
import BlurScrollImage from './src/views/blurscrollimages/BlurScrollImage';
import SwitchItemAnimated from './src/views/switchitemanimated/SwitchItemAnimated';
import News from './src/views/news/News';
import ProductDetail from './src/views/productdetail/ProductDetail';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CountDownTimer from './src/views/countdowntimer/CountDownTimer';
import GalleryParallax from './src/views/gallerybarallax/GalleryParallax';
import Onboarding from './src/views/onboardding/OnBoardDing';
import ProcessBar from './src/views/processbar/ProcessBar';
const App = () => {
  return (
    <GestureHandlerRootView>
      {/* <PhoneRing /> */}
      {/* <Loading /> */}
      {/* <Switch /> */}
      {/* <Gallery /> */}
      {/* <FlatListEffect /> */}
      {/* <BlurScrollImage /> */}
      {/* <SwitchItemAnimated /> */}
      {/* <News /> */}
      {/* <ProductDetail /> */}
      {/* <CountDownTimer /> */}
      {/* <GalleryParallax /> */}
      {/* <Onboarding /> */}
      <ProcessBar />
    </GestureHandlerRootView>
  );
};

export default App;
