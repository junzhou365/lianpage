var setLayout = function(basics, windowWidth, windowHeight) {
  var barWidth = basics.barWidth;
  var barHeight = basics.barHeight;
  var lineLength = basics.lineLength;
  var lineWidth = basics.lineWidth;

  var lrMargin = (windowWidth - 3 * barWidth - 2 * lineLength) / 2;
  if (lrMargin < 0) {
    lrMargin = 0;
    lineLength = (windowWidth - 3 * barWidth) / 2;
  }
  var topMargin = (windowHeight - 2 * lineLength - 3 * barHeight) / 2;
  if (topMargin < 0) {
    topMargin = 0;
    lineLength = (windowWidth - 2 * barWidth) / 3;
  }


  var bottomThreeDivsHeight = topMargin + lineLength + barHeight;
  var posProjects = {left: lrMargin + barWidth + lineLength, top: topMargin};
  var posAbout = {left: lrMargin, top: bottomThreeDivsHeight};
  var posJun = {left: lrMargin + barWidth + lineLength, top: bottomThreeDivsHeight};
  var posContact = {left: lrMargin + 2 * barWidth + 2 * lineLength, top: bottomThreeDivsHeight};
  var posGames = {left: lrMargin + barWidth + lineLength, top: bottomThreeDivsHeight + barHeight + lineLength};

  $("#jun").css({top: posJun.top, left: posJun.left, width: barWidth, height: barHeight, position: "absolute"});

  $("#about").css({top: posAbout.top, left: posAbout.left, width: barWidth, height: barHeight, position: "absolute"});
  $("#line_about").css({top: posAbout.top + barHeight / 2 - lineWidth / 2, left: posAbout.left + barWidth, marginLeft: lineLength, position: "absolute"});

  $("#contact").css({top: posContact.top, left: posContact.left, width: barWidth, height: barHeight, position: "absolute"});
  $("#line_contact").css({top: posContact.top + barHeight / 2 - lineWidth / 2, left: posContact.left - lineLength, position: "absolute"});

  $("#projects").css({top: posProjects.top, left: posProjects.left, width: barWidth, height: barHeight, position: "absolute"});
  $("#line_projects").css({top: posProjects.top + barHeight, left: posProjects.left + barWidth/ 2 - lineWidth / 2, marginTop: lineLength, position: "absolute"});

  $("#games").css({top: posGames.top, left: posGames.left, width: barWidth, height: barHeight, position: "absolute"});
  $("#line_games").css({top: posGames.top - lineLength, left: posGames.left + barWidth / 2 - lineWidth / 2, position: "absolute"});
}

var selectSection = function(basics, $state, section) {
  return function() {
    var sections = ["about", "games", "projects", "contact"].filter(function(x){ return x != section});
    sections.splice(0, 0, section);
    var durationJun = 500;
    var durationLine = 250;
    var durationStep1 = 250; // section appears
    var durationStep2 = 500; // section slides
    var durationStep3 = 250; // wait and section disappears
    var redirectDelay = durationJun + durationLine +
      durationStep1 + durationStep2 + durationStep3 + 100;

    $("#jun").velocity({ borderWidth: 4}, durationJun)
    .delay(durationLine+durationStep1)
    .velocity({opacity: 0}, {duration: durationStep2, display: "none"});

    var lineCSSChange1;
    var lineCSSChange2;
    var cssChange;
    var lineDurationStep2;
    if (sections[0] === "about") {
      cssChange = { left: "+="+(basics.lineLength + basics.barWidth) };
      lineCSSChange1 = { height: basics.lineWidth };
      lineCSSChange2 = { width: basics.lineLength, marginLeft: 0 };
      lineCSSChange3 = { width: 0, marginLeft: basics.lineLength };
      lineDurationStep2 = durationStep2 * basics.lineLength / (basics.lineLength + basics.barWidth);
    } else if (sections[0] == "games") {
      cssChange = { top: "-="+(basics.lineLength + basics.barHeight) };
      lineCSSChange1 = { width: basics.lineWidth };
      lineCSSChange2 = { height: basics.lineLength };
      lineCSSChange3 = { height: 0 };
      lineDurationStep2 = durationStep2 * basics.lineLength / (basics.lineLength + basics.barHeight);
    } else if (sections[0] == "contact") {
      cssChange = { left: "-="+(basics.lineLength + basics.barWidth) };
      lineCSSChange1 = { height: basics.lineWidth };
      lineCSSChange2 = { width: basics.lineLength };
      lineCSSChange3 = { width: 0 };
      lineDurationStep2 = durationStep2 * basics.lineLength / (basics.lineLength + basics.barWidth);
    } else {
      cssChange = { top: "+="+(basics.lineLength + basics.barHeight) };
      lineCSSChange1 = { width: basics.lineWidth };
      lineCSSChange2 = { height: basics.lineLength, marginTop: 0 };
      lineCSSChange3 = { height: 0, marginTop: basics.lineLength };
      lineDurationStep2 = durationStep2 * basics.lineLength / (basics.lineLength + basics.barHeight);
    }

    $("#line_"+sections[0]).delay(durationJun).css(lineCSSChange1).velocity(lineCSSChange2, durationLine)
    .delay(durationStep1)
    // ease in linear
    .velocity(lineCSSChange3, lineDurationStep2, [0,0,1,1]);


    $("#"+sections[0]).delay(durationLine + durationJun)
    .velocity({ borderWidth: 4 }, durationStep1)
    .velocity(cssChange, durationStep2, [0,0,1,1])
    .velocity({opacity: 0}, {duration: durationStep3, display: "none"});

    $("#"+sections[1])
    .delay(durationJun+durationLine+durationStep1)
    .velocity({opacity: 0}, {duration: durationStep2, display: "none"});
    // console.log($("#games").css(opacity));

    $("#"+sections[2])
    .delay(durationJun+durationLine+durationStep1)
    .velocity({opacity: 0}, {duration: durationStep2, display: "none"});

    $("#"+sections[3])
    .delay(durationJun+durationLine+durationStep1)
    .velocity({opacity: 0}, {duration: durationStep2, display: "none"});

    setTimeout(function(){ $state.go(sections[0]); }, redirectDelay);
  }
}
