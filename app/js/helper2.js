function vidFade(vid) {
  vid.classList.add("stopfade");
}

var controlVideo = function() {
  var vid = document.getElementById("bgvid");
  if (vid != null) {
    vid.addEventListener('ended', function()
    {
      // only functional if "loop" is removed
        vid.pause();
      // to capture IE10
        vidFade(vid);
    });
  }

}

var selectSection = function(basics, $state, section) {
  return function() {
    sections = ["about", "projects", "contact"].filter(function(x){ return x != section});
    sections.splice(0, 0, section);
    var durationStep1 = 500;
    var durationStep2 = 500;
    var redirectDelay = durationStep1 + durationStep2;
    // $("#"+sections[0]).delay(durationStep1)
    // .velocity({opacity: 0}, {duration: durationStep2, display: "none", easing: [0,0,1,1]});
    // $("#"+sections[0]).css({borderWidth: 4});

    // $("#jun").delay(durationStep1)
    // .velocity({opacity: 0}, {duration: durationStep2, display: "none", easing: [0,0,1,1]});

    // $("#"+sections[1])
    // .velocity({opacity: 0}, {duration: durationStep1, display: "none"});
    //
    // $("#"+sections[2])
    // .velocity({opacity: 0}, {duration: durationStep1, display: "none"});
    //
    // $("#"+sections[3])
    // .velocity({opacity: 0}, {duration: durationStep1, display: "none"});

    // $("#menu").delay(durationStep1)
    // .velocity({opacity: 0}, {duration: durationStep2, display: "none"});
    if (section == "projects") {
      setTimeout(function(){ $state.go(section); }, redirectDelay);
    } else {
      setTimeout(function(){ $state.go("main." + section); }, redirectDelay);
    }

  }
}

function expandMenu() {
  var height = $("#menu").outerHeight(true);
  var sections = $("#menu").children();
  var size = sections.length;
  $("#menu").velocity({height: height}, {duration : 500 * size, easing: [0,0,0,1]})
  for (var i = 0; i < sections.length; i++) {
    sections.eq(i)
    .velocity("fadeIn", {duration: 250, delay: i * 250});
  }

}
