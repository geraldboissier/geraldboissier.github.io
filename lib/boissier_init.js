////////////////////////////////////////////////////////////////////////
//                                                                    //
//                               CONFIG                               //
//                                                                    //
////////////////////////////////////////////////////////////////////////

var configHeaderImages = {
  //  All images must be stores in the 'images/header' directory
  images: [
    'IMG_0381.jpg',
    'IMG_1212.jpg'
  ],
  interval: 4000
};

var configEntrepriseTab = {
  delay: 1000,
  fadeup: {animation : 'fade up', duration : 1000}
};

var configOtherTabs = {
  delay: 1500,
  fadeup: {animation : 'fade up', duration : 800, interval : 400},
  pulse : {animation : 'pulse', duration : 800, interval : 400}
};

var configGoogleMap = {
  myLatlng: {lat: 44.443323, lng: 4.843242},
  zoom: 11
};


////////////////////////////////////////////////////////////////////////
//                                                                    //
//                               LAUNCH                               //
//                                                                    //
////////////////////////////////////////////////////////////////////////



$(function(){
  BOISSIER.initHiddenContent();
  BOISSIER.initHeaderImageSize();
  BOISSIER.initMenuTabs( configOtherTabs );
  BOISSIER.positionFooter();
  BOISSIER.initStickyMenuBar();
  BOISSIER.initSwipeGesture();
  BOISSIER.initRightLeftKeyPress();
  BOISSIER.initHeaderImages( configHeaderImages );
  BOISSIER.animateEntrepriseTab( configEntrepriseTab );
  BOISSIER.initActivitiesShapes();
  BOISSIER.initActivitiesModals();
  BOISSIER.initParallaxHeader();
  BOISSIER.initGoogleMap( configGoogleMap );
});

$( window ).resize(function() {
  BOISSIER.initHeaderImageSize();
  BOISSIER.positionFooter();
});
