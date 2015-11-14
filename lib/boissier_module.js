////////////////////////////////////////////////////////////////////////
//                                                                    //
//                               MODULE                               //
//                                                                    //
////////////////////////////////////////////////////////////////////////

var BOISSIER = (function(){

  //
  // VARIABLE DECLARATIONS
  //
  var publicAPI = {};
  var headerImages = [];
  var alreadyAnimatedSectionEntreprise = false;
  var alreadyAnimatedSectionActivites = false;
  var alreadyAnimatedSectionContact = false;
  var animationsEntreprise = {};
  var animationsActivites = {};
  var animationsContact = {};

  //
  // ENTREPRISE ANIMATIONS
  //
  var animateSectionEntreprise = function(){
    if( !alreadyAnimatedSectionEntreprise ){
      $('#section_entreprise .ui.segment')
        .transition(animationsEntreprise)
      ;
      alreadyAnimatedSectionEntreprise = true;
    }
  };

  //
  // ACTIVITIES ANIMATIONS
  //
  var animateSectionActivites = function(){
    if( !alreadyAnimatedSectionActivites ){
      $('#section_activites [sidetype=1] .ui.segment')
        .transition(animationsActivites)
      ;
      alreadyAnimatedSectionActivites = true;
    }
  };

  //
  // CONTACT INFO ANIMATIONS
  //
  var animateSectionContact = function(){
    if( !alreadyAnimatedSectionContact ) {
      $('#section_contact a')
        .transition(animationsContact)
      ;
      alreadyAnimatedSectionContact = true;
    }
  };

  var tabsPulse = {
    'entreprise': animateSectionEntreprise,
    'activites': animateSectionActivites,
    'contact': animateSectionContact
  };

  //
  // HAMMER TIME OBJECT
  //
  var hammertime = new Hammer(document.getElementById('hammer'));

  //
  // CHANGE TAB
  //
  var changeTab = function(dataTab) {
    changeMenu(dataTab);
    $('.menu .item').tab('change tab', dataTab);
  };

  //
  // CHANGE MENU TAB
  //
  var changeMenu = function(dataTab){
    $('#header_menu .active.item').removeClass('active');
    $('#header_menu .item[data-tab='+dataTab+']').addClass('active');
  };


  //
  // CHANGE IMAGE
  //
  var changeHeaderImage = function(){

    // Get image url
    var actualImageUrl = $('#header_image').css('background-image');
    // Extract image name
    var start = actualImageUrl.lastIndexOf("/")+1;
    var end   = actualImageUrl.length-2;
    var actualImage = actualImageUrl.substring(start, end);
    // Get actual image index
    var index = headerImages.indexOf(actualImage);
    var nextIndex = index >= headerImages.length-1 ? 0: index+1;
    var nextImage = headerImages[nextIndex];
    // Change images
    $('#header_image').css('background-image', 'url(images/header/'+nextImage+')');
  };

  //
  // FLIP SHAPE
  //
  var flip = function(shape, selector, action){

    if( $(selector).length ){

      $('.side.active').css( {
        'height': $('.side.active').height(),
        'width' : $('.side.active').width()
      });

      $('.side').not('.active').css( {
        'height': $(selector).height(),
        'width' : $(selector).width()
      });

      $('.ui.shape[shapeid='+shape+']')
        .shape('set next side', selector)
        .shape(action)
      ;

      // initImagePopup(selector);
    }
    else {
      console.log('flip side: selector not found.');
    }
  };

  //
  // CHANGE MAIN IMAGE IN MODAL
  //
  var displayMainModalImage = function(img){
    var modalid = $(img).closest('.ui.modal').attr('id');
    // Old image
    $('#'+modalid+' .small.image.disabled').removeClass('disabled');
    // New image
    $(img).addClass("disabled");
    $('#'+modalid+' .main.image').attr('src', $(img).attr('src'));
  }



  //
  // PUBLIC API
  //

  publicAPI.initHiddenContent = function(){
    $('#section_entreprise .ui.segment').transition('hide');
    $('#section_activites [sidetype=1] .ui.segment').transition("hide");
  };

  publicAPI.initMenuTabs = function( config ){
    animationsActivites = config.fadeup;
    animationsContact = config.pulse;

    $('.menu .item').tab({
      onVisible: function(tabPath){
        setTimeout( tabsPulse[tabPath], config.delay );
      }
    });

    $('.menu .item').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#header_menu').offset().top-1
    	}, 2000);
    	return false;
    });

  };

  publicAPI.animateEntrepriseTab = function(config){
    animationsEntreprise = config.fadeup;
    setTimeout( tabsPulse['entreprise'], config.delay );
  };

  publicAPI.positionFooter = function(){
    var availHeight = $(window).height() - 550;
    if(availHeight > 0) {
      $('.tab.segment').css('min-height', availHeight);
    }
  };

  publicAPI.initHeaderImageSize = function(config){
    var height = window.innerHeight;
    $('#header_image .grid.container').css('min-height', height-56);
  };

  publicAPI.initHeaderImages = function(config){
    headerImages = config.images;
    setInterval(changeHeaderImage, config.interval);
  };

  publicAPI.initParallaxHeader = function(){
    $('#header_image').visibility({
      once       : false,
      continuous : true,
      onPassing  : function(calculations) {
        var logoHeight = +$('#header_image .logo.image').css('height').replace('px','');
        var newMargin = calculations.percentagePassed*900; //900
        var outerHeight = window.innerHeight-56; //-56*2;

        console.log("------");
        console.log(logoHeight);//+newMargin);
        console.log(outerHeight);

        if( (logoHeight+newMargin) < outerHeight ){
          $('#header_image .logo.image')
            .css('margin-top',newMargin+"px");
        }
      }
    });
  };

  publicAPI.initStickyMenuBar = function(){
    $('#header_menu').visibility({
      once: false,
      onTopPassed: function(){
        $(this).addClass('transparent');
      },
      onTopPassedReverse: function(){
        $(this).removeClass('transparent');
      }
    });
  };

  publicAPI.initSwipeGesture = function(){
    hammertime.on('swipeleft', function(ev) {
      var dataTab = $('#header_menu .active.item').attr('data-tab');
      switch( dataTab ){
        case 'entreprise':
          changeTab('activites');
          break;
        case 'activites':
          changeTab('contact');
          break;
        case 'contact':
          break;
      }
    });

    hammertime.on('swiperight', function(ev) {
      var dataTab = $('#header_menu .active.item').attr('data-tab');
      switch( dataTab ){
        case 'entreprise':
          break;
        case 'activites':
          changeTab('entreprise');
          break;
        case 'contact':
          changeTab('activites');
          break;
      }
    });
  };

  publicAPI.initRightLeftKeyPress = function(){
    $("body").keydown(function(e) {

      var dataTab = $('#header_menu .active.item').attr('data-tab');

      if( e.keyCode == 37) { // left
        switch( dataTab ){
          case 'entreprise':
            break;
          case 'activites':
            changeTab('entreprise');
            break;
          case 'contact':
            changeTab('activites');
            break;
        }
      } else if( e.keyCode == 39) { // right
        switch( dataTab ){
          case 'entreprise':
            changeTab('activites');
            break;
          case 'activites':
            changeTab('contact');
            break;
          case 'contact':
            break;
        }
      }
    });
  };

  publicAPI.initActivitiesShapes = function(){

    $('.shape').shape({
      beforeChange: function(e) {
        var buttons = $(this).find('.button').length;
        var minHeight = (buttons + 1) * 60;
        var actualHeight = $(this).children('.ui.segment').css('height').replace('px', '');

        if( actualHeight < minHeight ){
          $(this).children('.ui.segment').css('min-height', minHeight+'px');
        }
      }
    });

    $('#section_activites [showside] ').click(function(){
      var shapeid = $(this).attr("shapeid");
      var sideid = $(this).attr('showside');
      var direction = $(this).attr('direction');
      if( sideid )
        flip(shapeid, ".side[sideid='"+sideid+"']", "flip "+direction);
    });

  };

  publicAPI.initActivitiesModals = function(){
    $('.ui.modal').modal({
      onShow: function(){
        // select first
        var modalid = $(this).attr('id');
        var img1 = $('#'+modalid+' .small.image').first();
        // display
        displayMainModalImage(img1);
      }
    });

    $('#section_activites [showmodal] ').click(function(){
      var modalid = $(this).attr("showmodal");
      $('#'+modalid).modal('show');
    });

    $('.ui.modal .small.image').click(function(){
      displayMainModalImage(this);
    });

    $('.ui.embed').embed();
  };

  publicAPI.initGoogleMap = function( config ){

    var initialize = function(){
      var mapCanvas = document.getElementById('googlemap');
      var mapOptions = {
        center: config.myLatlng,
        zoom: config.zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions)

      var marker = new google.maps.Marker({
        position: config.myLatlng,
        map: map
      });
    };

    google.maps.event.addDomListener(window, 'load', initialize);
  };

  publicAPI.initHeaderLeftMove = function(){

    var x = window.innerWidth/2*(-1) + 220;
    var y = window.innerHeight/2*(-1) + 180;

    x = x < 0 ? x+'px': '0px';
    y = 0; // y < 0 ? y+'px': '0px';

    var cssValue = 'translate('+x+','+y+') scale(0.80,0.80)'
    console.log(cssValue);

    setTimeout(function(){
      $('.ui.logo.image').css({
        'transition':'all 1s linear 2s',
        'transform': cssValue
      });
    }, 2000);

    setTimeout(function(){
      $('.ui.logo.image').css('transition','none');
    }, 4000);
  };

  return publicAPI;

})();
