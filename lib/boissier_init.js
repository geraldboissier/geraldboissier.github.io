////////////////////////////////////////////////////////////////////////
//                                                                    //
//                               CONFIG                               //
//                                                                    //
////////////////////////////////////////////////////////////////////////

var configHeaderImages = {
  //  All images must be stores in the 'images/header' directory
  images: [
    '1_DSC00590.JPG',
    '2_IMG_1328.JPG',
    '3_IMG_1011.JPG',
    '4_IMG_1326.JPG',
    '5_DSC01595.JPG',
    '6_100MSD-DSC05636_DSC05636.JPG',
    '7_DSC06086.JPG',
    '8_IMG_1684.JPG',
    '9_121-2117_IMG.JPG',
    '10_121-2119_IMG.JPG',
    '11_DSC00614.JPG',
    '12_IMG_1681.JPG',
    '13_100-0061_IMG.JPG',
    '13a_IMG_2404.JPG',
    '14_DSC02995.JPG',
    '15_IMG_0481.JPG',
    '16_DSC00575.JPG',
    '17_IMG_1212.JPG',
    '18_IMG_0949.JPG',
    '19_IMG_0946.JPG',
    '20_IMG_0624.JPG',
    '21_IMG_0379.JPG'
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
