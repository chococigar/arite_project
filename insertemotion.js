var stupidvar = 1;
var feeling = "Happy";
var reason = "Arite is such an awesome interface (づ｡◕‿‿◕｡)づ ";
var avatar_index = 0;
const RADIUS = 200;
var filename = 'avatar.png';
var AVAT_HEIGHT = 50;
var AVAT_WIDTH = 50;
var SCREEN_HEIGHT = 600;
var SCREEN_WIDTH = 800;

var w = window.innerWidth,
    h = window.innerHeight,
    margin = { top: 40, right: 20, bottom: 20, left: 40 },
    radius = 6;
var svg ;

$(document).ready(function() {
  $('.modal').modal();
  //initialize firebase
  var config = {
    apiKey: "AIzaSyBIuiGklPwChoeJ2PFWQVOJCvhO82Dbh0o",
    authDomain: "arite-project-6982b.firebaseapp.com",
    databaseURL: "https://arite-project-6982b.firebaseio.com",
    projectId: "arite-project-6982b",
    storageBucket: "",
    messagingSenderId: "281398737861"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  var usersReference = database.ref("users");

  svg = d3.select("body").append("svg").attr({
    width: w,
    height: h
  });

  var dataset = [];

  // make sure you take care of the firebase's latency asynchronosity
  function retrieveFBData() {
    dataset = [];
    $.when(
      usersReference.once("value", function(snap){
        snap.forEach(function(user){
          database.ref("users/" + user.key + "/days").once("value",  function(day) {
            day.forEach(function(finput){
              //console.log(user.val())
              var thetime = finput.val().date;
              if (thetime == GetTodayDate()){
                dataset.push({
                  x: finput.val().xpos,
                  y: finput.val().ypos,
                  //"xlink:href": user.val().avatar + filename,
                  avatar : user.val().avatar,
                  //height:50,
                  //width:50,
                  feeling: finput.val().feeling,
                  reason: finput.val().reason

      var filename = 'avatar.png';
      var AVAT_HEIGHT = 50;
      var AVAT_WIDTH = 50;

      var w = window.innerWidth * 0.6,
          h = window.innerHeight * 0.8,
          margin = { top: 40, right: 20, bottom: 20, left: 40 },
          radius = 6;

      var svg = d3.select(".emotion_graph").append("svg").attr({
        width: w,
        height: h
      });

      var dataset = [];

      // make sure you take care of the firebase's latency asynchronosity
      function retrieveFBData() {
        dataset = [];
        $.when(
          usersReference.once("value", function(snap){
            snap.forEach(function(user){
              database.ref("users/" + user.key + "/days").once("value",  function(day) {
                day.forEach(function(finput){
                  //console.log(user.val())
                  var thetime = finput.val().date;
                  if (thetime == GetTodayDate()){
                    dataset.push({
                      x: finput.val().xpos,
                      y: finput.val().ypos,
                      //"xlink:href": user.val().avatar + filename,
                      avatar : user.val().avatar,
                      //height:50,
                      //width:50,
                      feeling: finput.val().feeling,
                      reason: finput.val().reason

                    });

                  }
                  //console.log(dataset);

                });
              }
            });
          });
        });
      }).done(function( x ) {
        //console.log("bloody hell");
    });
  }



  // TODO remove these scalings
  var xScale = d3.scale.linear()
      .domain([0, SCREEN_WIDTH])
      .range([0, SCREEN_WIDTH]);  // Set margins for x specific


  var yScale = d3.scale.linear()
      .domain([0, SCREEN_HEIGHT])
      .range([0, SCREEN_HEIGHT]);  // Set margins for y specific

  var xAxis = d3.svg.axis().scale(xScale).orient("top");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  var circleAttrs = {
      x: function(d) { return d.x - AVAT_WIDTH/2; },
      y: function(d) { return d.y - AVAT_HEIGHT/2; },
      "xlink:href": function(d){ return d.avatar + "avatar.png"; },
      height:AVAT_HEIGHT,
      width:AVAT_WIDTH,
      //r: radius,
      id:"avatar"
      //transition:"visibility 0.3s linear"   TODO
      //visibility:"hidden"

  };


  // Adds X-Axis as a 'g' element
  svg.append("g").attr({
    "class": "axis",  // Give class so we can style it
    transform: "translate(" + [0, margin.top] + ")"  // Translate just moves it down into position (or will be on top)
  }).call(xAxis);  // Call the xAxis function on the group

  // Adds Y-Axis as a 'g' element
  svg.append("g").attr({
    "class": "axis",
    transform: "translate(" + [margin.left, 0] + ")"
  }).call(yAxis);  // Call the yAxis function on the group

  svg.selectAll("image")
      .data(dataset)
      .enter()
      .append("svg:image")
      .attr(circleAttrs)  // Get attributes from circleAttrs var
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  /*svg.append('svg:image')
  .attr({
    'xlink:href': 'trump_avatar.png',  // can also add svg file here
    x: 0,
    y: 0,
    height:50,
    width:50
  });*/

  svg.selectAll()

  // On Click, we want to add data to the array and chart
  svg.on("click", function() {
      svg.selectAll("circle").remove()
      var coords = d3.mouse(this);
      console.log(coords[0])
      console.log(Math.round(coords[0]))
      //Normally we go from data to pixels, but here we're doing pixels to data
      var newData= {
        x: Math.round( coords[0]),  // Takes the pixel number to convert to number
        y: Math.round( coords[1]),

        height:50,
        width:50,
        "xlink:href": avatar_index + "avatar.png",

        //height:50,
        //width:50,
        //"xlink:href": avatar_index + "avatar.png",
        avatar : avatar_index,

        feeling : feeling,
        reason : reason

      };

      if (stupidvar < 1) {
        insertNewFeeling(newData.x, newData.y, newData.feeling, newData.reason);
        dataset.push(newData);   // Push data to our array
        $("body").css('cursor','pointer');
        stupidvar += 1;

      }
      console.log("feeling is "+ feeling);

      console.log(dataset)
      svg.selectAll("image")  // For new circle, go through the update process
        .data(dataset)
        .enter()
        .append("image")
        .attr(circleAttrs)  // Get attributes from circleAttrs var
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      console.log(newData);
      riffle = svg.append("circle")
        .attr('cx',coords[0])
        .attr('cy',coords[1])
        .attr('r',0)
        .attr('fill','none')
        .attr('stroke','black')

      riffle.transition().duration(100)
        .attr('r',RADIUS)




      TRANSPARENCY_DELAY = 500;
      d3.selectAll("#avatar")
            .data(dataset)
            .transition()
            .duration(TRANSPARENCY_DELAY)
            .attr("opacity",function(d,i){
              //console.log(distance(newData,d))
              //console.log(" " + distance(newData,d) + " $ " + 500)
              if(distance_squared(newData,d) < RADIUS*RADIUS){
                return "1"
              }
              else{
                return "0"
              }
            });

          d3.timer(make_hidden(newData,dataset),TRANSPARENCY_DELAY)
          //setTimeout("make_hidden(newData,dataset)" ,0.5)

    })
  retrieveFBData();
  //parseURL();
//d3.selectAll("#avatar").attr("visibility", "hidden");
});
function make_hidden(newData,dataset){
  d3.selectAll("#avatar")
        .data(dataset)
        .attr("visibility",function(d,i){
          //console.log(distance(newData,d))
          //console.log(" " + distance(newData,d) + " $ " + 500)
          if(distance_squared(newData,d) < RADIUS*RADIUS){
            return "visible"
          }
          else{
            return "hidden"

          }
        });
}

function distance_squared(a,b){
  return (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y);
}
    // Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

  // Use D3 to select element, change color and size
  d3.select(this).attr({
    fill: "orange",
    r: radius * 2
  });

  // Specify where to put label of text
  svg.append("text").attr({
     id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
      x: function() { return d.x - 30; },
      y: function() { return d.y - 15; }
  })
  .text(function() {

    return "I felt "+ d.feeling + " because " + d.reason;  // Value of the text
  });
}
function handleMouseOut(d, i) {
      // Use D3 to select element, change color back to normal
      d3.select(this).attr({
        fill: "black",
        r: radius
      });

      // Select text by id and then remove
      d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
    }

//var feeling = $("#feeling").text();
//var reason = $("#reason").text();


function insertNewFeeling(xpos, ypos, feeling, reason) {
  usersReference.once("value", function(snap){
    snap.forEach(function(user) {
      console.log("the avatar", user.val().avatar)
      if (user.val().avatar == avatar_index) {
        console.log("I am right now avatar ", avatar_index, "adding to ", user.val())
        database.ref("users/" + user.key + "/days").push({
          xpos: xpos,
          ypos: ypos,
          feeling: feeling,
          reason: reason,
          date: GetTodayDate()
        });
      }
    });
  });
}

function GetTodayDate() {
  var tdate = new Date();
  var dd = tdate.getDate(); //yields day
  var MM = tdate.getMonth(); //yields month
  var yyyy = tdate.getFullYear(); //yields year
  if (dd < 10){
    dd = "0" + dd;
  }
  var currentDate = dd +"" +( MM+1) + "" + yyyy;
  return currentDate;
}

function parseURL() {
  feeling = $.query.get("feeling");
  reason = $.query.get("reason");
}
