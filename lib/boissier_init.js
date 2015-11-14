////////////////////////////////////////////////////////////////////////
//                                                                    //
//                               CONFIG                               //
//                                                                    //
////////////////////////////////////////////////////////////////////////

var configHeaderImages = {
  //  All images must be stores in the 'images/header' directory
  images: [
    '1_DSC00590.jpg',
    '2_IMG_1328.jpg',
    '3_IMG_1011.jpg',
    '4_IMG_1326.jpg',
    '5_DSC01595.jpg',
    '6_100MSD-DSC05636_DSC05636.jpg',
    '7_DSC06086.jpg',
    '8_IMG_1684.jpg',
    '9_121-2117_IMG.jpg',
    '10_121-2119_IMG.jpg',
    '11_DSC00614.jpg',
    '12_IMG_1681.jpg',
    '13_100-0061_IMG.jpg',
    '13a_IMG_2404.jpg',
    '14_DSC02995.jpg',
    '15_IMG_0481.jpg',
    '16_DSC00575.jpg',
    '17_IMG_1212.jpg',
    '18_IMG_0949.jpg',
    '19_IMG_0946.jpg',
    '20_IMG_0624.jpg',
    '21_IMG_0379.jpg'
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
  // BOISSIER.initParallaxHeader();

});

$( window ).resize(function() {
  BOISSIER.initHeaderImageSize();
  BOISSIER.positionFooter();
});

$('#header_menu [data-tab=activites]').click(function(){
  console.log('on click > activites');
  BOISSIER.initActivitiesModals();
});

$('#header_menu [data-tab=contact]').click(function(){
  console.log('on click > contact');
  BOISSIER.initGoogleMap( configGoogleMap );
});
