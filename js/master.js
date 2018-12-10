var people = [];
var counter = 0;
var add = function(){
  if(validate() != 0){
    var person = {
      id:counter,
      fname:$("#fname").val(),
      lname:$("#lname").val(),
      age:$("#age").val(),
      gender:$('input[name=gender]:checked').val(),
    }
    people.push(person);
    counter++;
    render();
  }
}

var render = function(){
  $("#userRendering").empty();

  people.forEach((element, i)=>{
    var btn = $("<input>");
    btn.attr({
      type:"button",
      class:"removeBtn",
      onclick:`remove(${element.id})`,
      value:"Remove",
      onMouseOver:"$(this).parent().css('backgroundColor', 'red')",
    });
    if(element.gender === "Female"){
      btn.attr({
        onMouseOut:"$(this).parent().css('backgroundColor', 'pink')",
      });
    }
    else{
      btn.attr({
        onMouseOut:"$(this).parent().css('backgroundColor', 'lightblue')",
      });
    }
    var tr = $("<tr>").append($("<td>").text(element.id)).append($("<td>").text(element.fname)).append($("<td>").text(element.lname)).append($("<td>").text(element.age)).append($("<td>").text(element.gender)).append(btn);

    if(element.gender === "Male"){
      tr.attr({
        class:"male"
      });
    }
    else if(element.gender === "Female"){
      tr.attr({
        class:"female"
      });
    }
    $("#userRendering").append(tr);
  });
}
var remove = function(id){
  people.splice(people.findIndex((e)=>e.id === id), 1);
  render();
}

var save = function(){
  localStorage.setItem("db", JSON.stringify(people));
  localStorage.setItem("id", counter);
}
var load = function(){
  people = JSON.parse(localStorage.getItem("db"));
  counter = localStorage.getItem("id");
  if(people === null){
    people = [];
    counter = 0;
  }

  render();
}
var hideErrors = function(){
  $("#fnameError").hide();
  $("#lnameError").hide();
  $("#ageError").hide();
  $("#ageNegativeError").hide();
  $("#genderError").hide();
}
window.onload = function(){
  hideErrors();
}
var validate = function(){
  hideErrors();
  var toReturn = 1;
  if($("#fname").val() === ""){
    toReturn = 0;
    $("#fnameError").show();
  }
  if($("#lname").val() === ""){
    toReturn = 0;
    $("#lnameError").show();
  }
  if($('input[name=gender]:checked').val() === undefined){
    toReturn = 0;
    $("#genderError").show();
  }
  if($('#age').val() === ""){
    toReturn = 0;
    $("#ageError").show();
  }else if(parseInt($("#age").val()) < 0){
    toReturn = 0;
    $("#ageNegativeError").show();
  }
  return toReturn;
}

var sortById = function(reverse){
  setInactive();
  people.sort((o1, o2) => (parseInt(o1.id)>parseInt(o2.id)?1:-1));
  if(reverse)
    people.reverse();
  if(!reverse)
      $("#idsort").attr({class:"actionbtn active"});
  else
      $("#idsort-reverse").attr({class:"actionbtn active"});
  render();
}
//TODO: tolowercase
var sortByString = function(field, reverse){
  setInactive();
  switch(parseInt(field)){
    case 1:
      people.sort((o1,o2) => o1.fname.toLowerCase() > o2.fname.toLowerCase()?1:-1);
      if(!reverse)
          $("#fnamesort").attr({class:"actionbtn active"});
      else
          $("#fnamesort-reverse").attr({class:"actionbtn active"});
      break;
    case 2:
      people.sort((o1,o2) => o1.lname.toLowerCase() > o2.lname.toLowerCase()?1:-1);
      if(!reverse)
        $("#lnamesort").attr({class:"actionbtn active"});
      else
        $("#lnamesort-reverse").attr({class:"actionbtn active"});
      break;
    case 3:
      people.sort((o1,o2) => o1.gender.toLowerCase() > o2.gender.toLowerCase()?1:-1);
      if(!reverse)
        $("#gendersort").attr({class:"actionbtn active"});
      else
        $("#gendersort-reverse").attr({class:"actionbtn active"});
      break;
  }
  if(reverse)
    people.reverse();
  render();
}

var sortByAge = function(reverse){
  setInactive();
  people.sort((o1, o2) => (parseInt(o1.age)>parseInt(o2.age)?1:-1));
  if(reverse)
    people.reverse();
    if(!reverse)
      $("#agesort").attr({class:"actionbtn active"});
    else
      $("#agesort-reverse").attr({class:"actionbtn active"});
  render();
}
var setInactive = function(){
  $("#idsort").attr({class:"actionbtn"});
  $("#idsort-reverse").attr({class:"actionbtn"});
  $("#fnamesort").attr({class:"actionbtn"});
  $("#fnamesort-reverse").attr({class:"actionbtn"});
  $("#lnamesort").attr({class:"actionbtn"});
  $("#lnamesort-reverse").attr({class:"actionbtn"});
  $("#agesort").attr({class:"actionbtn"});
  $("#agesort-reverse").attr({class:"actionbtn"});
  $("#gendersort").attr({class:"actionbtn"});
  $("#gendersort-reverse").attr({class:"actionbtn"});
}
