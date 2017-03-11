var textField = document.getElementById("tf");
var sliderField = document.getElementById("slider");

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
  
  return result;
  
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
  
});
