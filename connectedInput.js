var textField = document.getElementById("tf");
var sliderField = document.getElementById("slider");
mousedown = false;

var stripComma = function (str) {
  
  var result = "";
  
  for (var i = 0; i < str.length; i++) {
    
    var char = str.charAt(i);
    
    if (char !== ',') { result = result + char; }
    
  }
  
  return result;
  
};

var addComma = function (str) {
  
  var result = "";
  var count = 0;
  
  for (var i = str.length-1; i > 0; i--) {

    count++;
    result = str.charAt(i) + result;
    
    if (count == 3) { count = 0; result = "," + result; }    
    
  }
  
  return str.charAt(0) + result;
  
};

var tyDollaSign = function (opt, str) {
  
  if (opt) { return '$' + str; }
 
  return str.substring(1);
  
};

var cleanseMeGoddess = function (str) {
  
  var clean = "0123456789";
  var result = "";
  
  for (var i = 0; i < str.length; i++) {
    
    var char = str.charAt(i);
    
    if (clean.indexOf(char) > '-1') { result = result + char; }
    
  }

  if ( result.length < 1 ) {

    result = "0";

  }
  
  return result;
  
};

var couldYouHireMe = function () {


  var slider = document.getElementById("slider");
  var sliderval = slider.value;
  var resultEl = document.getElementById("answer");
  var answer = "";

  if (sliderval < 80001) {

    answer = "No.";
    resultEl.className = "red";

  } else if (sliderval < 90000) {

    answer = "Probably not.";
    resultEl.className = "yellow";

  } else if (sliderval < 100000) { 

    answer = "Possibly!";
    resultEl.className = "yellow";

  } else if (sliderval < 110000) {

    answer = "Probably.";
    resultEl.className = "yellow";

  } else if (sliderval < 120000) {

    answer = "Almost definitely.";
    resultEl.className = "yellow";

  } else if (sliderval > 120000 ) {

    answer = "Yes!";
    resultEl.className = "green";

  } else {

    answer = "I honestly dont know?";
    resultEl.className = "red";

  }

  resultEl.innerHTML = answer;


  //every time we update a result, update the gradient
  johnEntwhistle();

};

//set gradient background. mostly just for practice of calculations and javascript
var johnEntwhistle = function () {

  var slider = document.getElementById("slider");

  if(slider.getAttribute("data-attr-gradient") == "true") {

    var total = parseInt(slider.getAttribute("max")) - parseInt(slider.getAttribute("min"));
    var breakPercent = parseInt((parseInt(slider.value) - parseInt(slider.getAttribute("min"))) / total * 100);
    var color = "rgba(01,09,09,0.11) ";
    var linearGradient = "-webkit-linear-gradient(left, " + color + "0%, " + color + breakPercent + "%, white " + breakPercent + "%)";
    
    document.getElementById("tf").style.background = linearGradient;

  }

};

textField.addEventListener("blur", function (event) {         
  
  var other = parseInt(cleanseMeGoddess(event.target.value)); 
  var min = parseInt(sliderField.getAttribute("min"));
  var max = parseInt(sliderField.getAttribute("max"));
  
  if (other < min ) {
    other = min;
  } else if ( other > max ) {
    other = max;
  }
  
  document.getElementById("tf").value = tyDollaSign(1,addComma(other.toString()));

  couldYouHireMe();
  
});
                           
textField.addEventListener("input", function (event) {
  
  var other = cleanseMeGoddess(event.target.value); 
  
  var oi = parseInt(other);
  var min = textField.getAttribute("min");
  var max = textField.getAttribute("max");
  
  if (oi < parseInt(min)) { 
    other = min;
  } else if (oi > parseInt(max)) { 
    other = max;   
  }
  
  document.getElementById("slider").value = stripComma(other.toString());

  couldYouHireMe();

});

sliderField.addEventListener("input", function (event) {          
  
  var other = parseInt(event.target.value); 
  var min = parseInt(sliderField.getAttribute("min"));
  var max = parseInt(sliderField.getAttribute("max"));
  
  if (other < min ) {
    other = min;
  } else if ( other > max ) {
    other = max;
  }
  
  document.getElementById("tf").value = tyDollaSign(1,addComma(other.toString()));

  couldYouHireMe();
  
});

sliderField.addEventListener("mousedown", function (event) {

    mousedown = true;

});

sliderField.addEventListener("mouseup", function (event) {

    mouseup = false;

});

sliderField.addEventListener("mousemove", function (event) {

  //update calculator if mousedown
  if (mousedown) {
    couldYouHireMe();
  }


});

//call on init to set the gradient, I could have put it in the HTML to start but generally folks hate seeing inline styles in html templates
johnEntwhistle();