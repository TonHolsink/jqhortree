(function(e){e.fn.tree_structure=function(t){var n={add_option:true,edit_option:true,delete_option:true,confirm_before_delete:true,animate_option:[true,5],fullwidth_option:false,align_option:"center",draggable_option:true};
	return this.each(function(){function T(e){e.prepend(c+h).children("div").prepend(p+v+d);
	if(e.children("ul").length!=0)e.hasClass("hide")?e.children("div").prepend('<b class="hide show"></b>'):e.children("div").prepend('<b class="hide"></b>');
e.children("div").prepend(m)}function N(e){var t=e.children("div").outerWidth(true)/2;
var n=e.children("div").offset().left;
if(e.parents("li").offset()!=null)var r=e.parents("li").offset().top;
vertical_height=e.offset().top-r-e.parents("li").children("div").outerHeight(true)/2;
e.children("span.vertical").css({height:vertical_height,"margin-top":-vertical_height,"margin-left":t,left:n});
if(e.parents("li").offset()==null){var i=0}else{var s=e.parents("li").children("div").offset().left+e.parents("li").children("div").width()/2;
var o=n+e.children("div").width()/2;
var i=s-o}var u=i<0?-Math.abs(i)+t:t;
e.children("span.horizontal").css({width:Math.abs(i),"margin-top":-vertical_height,"margin-left":u,left:n})}function A(){e("."+g+" li").each(function(){if(y=="pageload")T(e(this));
	N(e(this))})}function O(e){if(e.length>0){e.children("div").addClass("parent");
e=e.closest("li").closest("ul").closest("li");
return O(e)}}if(t)e.extend(n,t);
var r=n["add_option"];
var i=n["edit_option"];
var s=n["delete_option"];
var o=n["confirm_before_delete"];
var u=n["animate_option"];
var a=n["fullwidth_option"];
var f=n["align_option"];
var l=n["draggable_option"];
var c='<span class="vertical"></span>';
var h='<span class="horizontal"></span>';
var p=r==true?'<span class="add_action" title="Click for Add"></span>':"";
var d=i==true?'<span class="edit_action" title="Click for Edit"></span>':"";
var v=s==true?'<span class="delete_action" title="Click for Delete"></span>':"";
var m='<span class="highlight" title="Click for Highlight | dblClick"></span>';
var g=e(this).attr("class");
var y="pageload";
if(f!="center")e("."+g+" li").css({"text-align":f});
if(a){var b=0;
	var w;
var E;
e("."+g+" li li").each(function(){var t=e(this).width();
	if(b==0||t>w){w=e(this).width();
	E=e(this)}b++});
var S=E.closest("ul").children("li").eq(0).nextAll().length;
var x=parseInt(0);
for($i=0;
	$i<=S;
$i++){x+=parseInt(E.closest("ul").children("li").eq($i).width())}e("."+g+"").closest("div").width(x)}e("."+g+" li.hide").each(function(){e(this).children("ul").hide()});
	if(u[0]==true){function C(){$timeout=setInterval(function(){L()},u[1])}var k=e("."+g+" li").length;
var b=0;
function L(){T(e("."+g+" li").eq(b));
N(e("."+g+" li").eq(b));
b++;
if(b==k){b=0;
	clearInterval($timeout)}}}u[0]?C():A();
y="others";
e(window).resize(function(){A()});
e("."+g+" b.hide").live("click",function(){e(this).toggleClass("show");
	e(this).closest("li").toggleClass("hide").children("ul").toggle();
A()});
e("."+g+" li > div").live("hover",function(t){if(t.type=="mouseenter"||t.type=="mouseover"){e("."+g+" li > div.current").removeClass("current");
	e("."+g+" li > div.children").removeClass("children");
e("."+g+" li > div.parent").removeClass("parent");
e(this).addClass("current");
e(this).closest("li").children("ul").children("li").children("div").addClass("children");
e(this).closest("li").closest("ul").closest("li").children("div").addClass("parent");
e(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").show()}else{e(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide()}});
e("."+g+" span.highlight").live("click",function(){e("."+g+" li.highlight").removeClass("highlight");
	e("."+g+" li > div.parent").removeClass("parent");
e("."+g+" li > div.children").removeClass("children");
e(this).closest("li").addClass("highlight");
e(".highlight li > div").addClass("children");
var t=e(this).closest("li").closest("ul").closest("li");
O(t)});
e("."+g+" span.highlight").live("dblclick",function(){if(a)e("."+g+"").parent("div").parent("div").scrollLeft(0);
	e("."+g+" li > div").not(".parent, .current, .children").closest("li").addClass("none");
e("."+g+" li div b.hide.show").closest("div").closest("li").children("ul").addClass("show");
e("."+g+" li div b.hide").addClass("none");
e("body").prepend('<img src="images/back.png" class="back_btn" />');
A();
e(".back_btn").click(function(){e("."+g+" ul.show").removeClass("show");
	e("."+g+" li.none").removeClass("none");
e("."+g+" li div b.hide").removeClass("none");
e(this).remove();
A()})});
if(r){e("."+g+" span.add_action").live("click",function(){if(e("form.add_data").length>0)e("form.add_data").remove();
	if(e("form.edit_data").length>0)e("form.edit_data").remove();
var t='<form class="add_data"><img class="close" src="images/close.png" /><h3>Add Detail</h3><textarea></textarea><input type="checkbox" value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="submit">Submit</span></form>';
if(e(this).closest("div").children("form.add_data").length==0){e(this).parent("div").append(t);
if(e(this).closest("div").children("form").offset().top+e(this).closest("div").children("form").outerHeight()>e(window).height()){e(this).closest("div").children("form").css({"margin-top":-e(this).closest("div").children("form").outerHeight()})}if(e(this).closest("div").children("form").offset().left+e(this).closest("div").children("form").outerWidth()>e(window).width()){e(this).closest("div").children("form").css({"margin-left":-e(this).closest("div").children("form").outerWidth()})}e(this).closest("div").children("form").children("textarea").focus();
e(this).closest("div").closest("li").closest("ul").children("li").children("div").addClass("zindex")}e("span.submit").click(function(){var t=e(this);
	if(t.closest("form").find("textarea").val()!=""){var n;
	if(t.closest("li").children("ul").length>0){n=parseInt(t.closest("li").children("ul").children("li").last().children("div").attr("id"))+1}else{n=t.closest("div").attr("id")+1}var r='data={"action":"add", "id":"'+n+'", "html":"'+t.closest("form").find("textarea").val().replace(/\s+/g," ")+'", "parentid":"'+t.closest("div").attr("id")+'", "showhideval":"'+t.closest("form").find("input:checked").length+'"}';
t.closest("li").before("<img src='images/load.gif' class='load' />");
var i="<li>"+c+h+'<div id="'+n+'">'+m+p+v+d+t.closest("form").find("textarea").val()+"</div></li>";
t.closest("li").children("ul").length>0?t.closest("li").children("ul").append(i):t.closest("li").append("<ul>"+i+"</ul>");
t.closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
t.closest("form.add_data").remove();
e("li > div.zindex").removeClass("zindex");
A();
M();
e("img.load").remove();
e("body").prepend('<div class="add_msg">Add Successfully...</div>');
e("div.add_msg").animate({top:200},4e3,function(){e(this).remove()})}else{t.closest("form").find("textarea").addClass("error")}});
e("img.close").click(function(){e(this).closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
	e(this).closest("form.add_data").remove();
e("li > div.zindex").removeClass("zindex")})})}if(s){e("."+g+" span.delete_action").live("click",function(){var t=e(this);
	var n=e(this).closest("li").closest("ul").closest("li");
confirm_message=1;
if(o){var r=e(this).closest("li").children("ul").length==0?"Deleat This ?":"Deleat This with\nAll Child Element ?";
confirm_message=confirm(r)}if(confirm_message){e(this).closest("li").addClass("ajax_delete_all");
ajax_delete_id=Array();
ajax_delete_id.push(e(this).closest("div").attr("id"));
e(".ajax_delete_all li").each(function(){ajax_delete_id.push(e(this).children("div").attr("id"))});
e(this).closest("li").removeClass("ajax_delete_all");
var i='data={"action":"delete", "id":"'+ajax_delete_id+'"}';
e(this).closest("li").before("<img src='images/load.gif' class='load' />");
e("img.load").remove();
t.closest("li").fadeOut().remove();
A();
if(n.children("ul").children("li").length==0)n.children("ul").remove();
e("body").prepend('<div class="delete_msg">Delete Successfully...</div>');
e("div.delete_msg").animate({top:200},4e3,function(){e(this).remove()})}})}if(i){e("."+g+" span.edit_action").live("click",function(){if(e("form.add_data").length>0)e("form.add_data").remove();
if(e("form.edit_data").length>0)e("form.edit_data").remove();
var t=e(this).closest("div").clone();
if(t.children("span.highlight").length>0)t.children("span.highlight").remove();
if(t.children("span.delete_action").length>0)t.children("span.delete_action").remove();
if(t.children("span.add_action").length>0)t.children("span.add_action").remove();
if(t.children("span.edit_action").length>0)t.children("span.edit_action").remove();
if(t.children("b.hide").length>0)t.children("b.hide").remove();
var n=e(this).closest("li").hasClass("hide")?"checked":"";
var r='<form class="edit_data"><img class="close" src="images/close.png" /><h3>Edit Detail</h3><textarea>'+t.html()+'</textarea><input type="checkbox" '+n+' value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="edit">Save</span></form>';
if(e(this).closest("div").children("form.edit_data").length==0){e(this).closest("div").append(r);
if(e(this).closest("div").children("form").offset().top+e(this).closest("div").children("form").outerHeight()>e(window).height()){e(this).closest("div").children("form").css({"margin-top":-e(this).closest("div").children("form").outerHeight()})}if(e(this).closest("div").children("form").offset().left+e(this).closest("div").children("form").outerWidth()>e(window).width()){e(this).closest("div").children("form").css({"margin-left":-e(this).closest("div").children("form").outerWidth()})}e(this).closest("div").children("form").children("textarea").select();
e(this).closest("div").closest("li").closest("ul").children("li").children("div").addClass("zindex")}e("span.edit").click(function(){var t=e(this);
	if(t.closest("form").find("textarea").val()!=""){var n='data={"action":"edit", "id":"'+t.closest("div").attr("id")+'", "html":"'+t.closest("form").find("textarea").val().replace(/\s+/g," ")+'", "showhideval":"'+t.closest("form").find("input:checked").length+'"}';
t.closest("li").before("<img src='images/load.gif' class='load' />");
if(t.closest("form").find("input:checked").length>0){if(t.closest("li").hasClass("hide")==false){t.closest("div").find("b.hide").trigger("click")}}else{if(t.closest("li").hasClass("hide")){t.closest("div").find("b.hide").trigger("click")}}var r=t.closest("form.edit_data").closest("div");
var i="";
i=t.closest("form").find("textarea").val();
r.children("span.edit_action").nextAll().remove();
if(r.text().length>0)r.html(r.html().replace(r.text(),""));
r.append(i);
r.children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
e("li > div.zindex").removeClass("zindex");
A();
e("img.load").remove();
e("body").prepend('<div class="edit_msg">Edit Successfully...</div>');
e("div.edit_msg").animate({top:200},4e3,function(){e(this).remove()})}else{t.closest("form").find("textarea").addClass("error")}});
e("img.close").click(function(){e(this).closest("form.edit_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
	e(this).closest("form.edit_data").remove();
e("li > div.zindex").removeClass("zindex")})})}if(l){function M(){e("."+g+" li > div").draggable({cursor:"move",distance:40,zIndex:5,revert:true,revertDuration:100,snap:".tree li div",snapMode:"inner",start:function(t,n){e("li.li_children").removeClass("li_children");
e(this).closest("li").addClass("li_children")},stop:function(t,n){var r=_();
	if(r==undefined){e("body").prepend('<div class="drag_error">Drag it Correctly...</div>');
e("div.drag_error").animate({top:200},4e3,function(){e(this).remove()})}}})}function _(){e("."+g+" li > div").droppable({accept:".tree li div",drop:function(t,n){e("div.check_div").removeClass("check_div");
e(".li_children div").addClass("check_div");
if(e(this).hasClass("check_div")){alert("Cant Move on Child Element.")}else{var r='data={"action":"drag", "id":"'+e(n.draggable[0]).attr("id")+'", "parentid":"'+e(this).attr("id")+'"}';
e(this).next("ul").length==0?e(this).after("<ul><li>"+e(n.draggable[0]).attr({style:""}).closest("li").html()+"</li></ul>"):e(this).next("ul").append("<li>"+e(n.draggable[0]).attr({style:""}).closest("li").html()+"</li>");
e(n.draggable[0]).closest("ul").children("li").length==1?e(n.draggable[0]).closest("ul").remove():e(n.draggable[0]).closest("li").remove();
A();
M();
e("body").prepend('<div class="drop_msg">Drag Successfully...</div>');
e("div.drop_msg").animate({top:200},4e3,function(){e(this).remove()})}}})}e("."+g+" li > div").disableSelection();
M()}})}})(jQuery)
