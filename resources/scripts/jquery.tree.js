(function($) {
	$.fn.tree_structure = function(t) {
		var n = {
			add_option: true,
			edit_option: true,
			delete_option: true,
			confirm_before_delete: true,
			animate_option: [true, 5],
			fullwidth_option: false,
			align_option: "center",
			draggable_option: true
		};
		return this.each(function() {
			function T($) {
				$.prepend(c + h).children("div").prepend(p + v + d);
				if($.children("ul").length != 0) $.hasClass("hide") ? $.children("div").prepend('<b class="hide show"></b>') : $.children("div").prepend('<b class="hide"></b>');
				$.children("div").prepend(m)
			}

			function N($) {
				var t = $.children("div").outerWidth(true) / 2;
				var n = $.children("div").offset().left;
				if($.parents("li").offset() != null) var r = $.parents("li").offset().top;
				vertical_height = $.offset().top - r - $.parents("li").children("div").outerHeight(true) / 2;
				$.children("span.vertical").css({
					height: vertical_height,
					"margin-top": -vertical_height,
					"margin-left": t,
					left: n
				});
				if($.parents("li").offset() == null) {
					var i = 0
				} else {
					var s = $.parents("li").children("div").offset().left + $.parents("li").children("div").width() / 2;
					var o = n + $.children("div").width() / 2;
					var i = s - o
				}
				var u = i < 0 ? -Math.abs(i) + t : t;
				$.children("span.horizontal").css({
					width: Math.abs(i),
					"margin-top": -vertical_height,
					"margin-left": u,
					left: n
				})
			}

			function A() {
				$("." + g + " li").each(function() {
					if(y == "pageload") T($(this));
					N($(this))
				})
			}

			function O($) {
				if($.length > 0) {
					$.children("div").addClass("parent");
					$ = $.closest("li").closest("ul").closest("li");
					return O($)
				}
			}
			if(t) $.extend(n, t);
			var r = n["add_option"];
			var i = n["edit_option"];
			var s = n["delete_option"];
			var o = n["confirm_before_delete"];
			var u = n["animate_option"];
			var a = n["fullwidth_option"];
			var f = n["align_option"];
			var l = n["draggable_option"];
			var c = '<span class="vertical"></span>';
			var h = '<span class="horizontal"></span>';
			var p = r == true ? '<span class="add_action" title="Click for Add"></span>' : "";
			var d = i == true ? '<span class="edit_action" title="Click for Edit"></span>' : "";
			var v = s == true ? '<span class="delete_action" title="Click for Delete"></span>' : "";
			var m = '<span class="highlight" title="Click for Highlight | dblClick"></span>';
			var g = $(this).attr("class");
			var y = "pageload";
			if(f != "center") $("." + g + " li").css({
				"text-align": f
			});
			if(a) {
				var b = 0;
				var w;
				var E;
				$("." + g + " li li").each(function() {
					var t = $(this).width();
					if(b == 0 || t > w) {
						w = $(this).width();
						E = $(this)
					}
					b++
				});
				var S = E.closest("ul").children("li").eq(0).nextAll().length;
				var x = parseInt(0);
				for($i = 0; $i <= S; $i++) {
					x += parseInt(E.closest("ul").children("li").eq($i).width())
				}
				$("." + g + "").closest("div").width(x)
			}
			$("." + g + " li.hide").each(function() {
				$(this).children("ul").hide()
			});
			if(u[0] == true) {
				function C() {
					$timeout = setInterval(function() {
						L()
					}, u[1])
				}
				var k = $("." + g + " li").length;
				var b = 0;

				function L() {
					T($("." + g + " li").eq(b));
					N($("." + g + " li").eq(b));
					b++;
					if(b == k) {
						b = 0;
						clearInterval($timeout)
					}
				}
			}
			u[0] ? C() : A();
			y = "others";
			$(window).resize(function() {
				A()
			});
			$("." + g + " b.hide").live("click", function() {
				$(this).toggleClass("show");
				$(this).closest("li").toggleClass("hide").children("ul").toggle();
				A()
			});
			$("." + g + " li > div").live("hover", function(t) {
				if(t.type == "mouseenter" || t.type == "mouseover") {
					$("." + g + " li > div.current").removeClass("current");
					$("." + g + " li > div.children").removeClass("children");
					$("." + g + " li > div.parent").removeClass("parent");
					$(this).addClass("current");
					$(this).closest("li").children("ul").children("li").children("div").addClass("children");
					$(this).closest("li").closest("ul").closest("li").children("div").addClass("parent");
					$(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").show()
				} else {
					$(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide()
				}
			});
			$("." + g + " span.highlight").live("click", function() {
				$("." + g + " li.highlight").removeClass("highlight");
				$("." + g + " li > div.parent").removeClass("parent");
				$("." + g + " li > div.children").removeClass("children");
				$(this).closest("li").addClass("highlight");
				$(".highlight li > div").addClass("children");
				var t = $(this).closest("li").closest("ul").closest("li");
				O(t)
			});
			$("." + g + " span.highlight").live("dblclick", function() {
				if(a) $("." + g + "").parent("div").parent("div").scrollLeft(0);
				$("." + g + " li > div").not(".parent, .current, .children").closest("li").addClass("none");
				$("." + g + " li div b.hide.show").closest("div").closest("li").children("ul").addClass("show");
				$("." + g + " li div b.hide").addClass("none");
				$("body").prepend('<img src="resources/images/back.png" class="back_btn" />');
				A();
				$(".back_btn").click(function() {
					$("." + g + " ul.show").removeClass("show");
					$("." + g + " li.none").removeClass("none");
					$("." + g + " li div b.hide").removeClass("none");
					$(this).remove();
					A()
				})
			});
			if(r) {
				$("." + g + " span.add_action").live("click", function() {
					if($("form.add_data").length > 0) $("form.add_data").remove();
					if($("form.edit_data").length > 0) $("form.edit_data").remove();
					var t = '<form class="add_data"><img class="close" src="resources/images/close.png" /><h3>Add Detail</h3><textarea></textarea><input type="checkbox" value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="submit">Submit</span></form>';
					if($(this).closest("div").children("form.add_data").length == 0) {
						$(this).parent("div").append(t);
						if($(this).closest("div").children("form").offset().top + $(this).closest("div").children("form").outerHeight() > $(window).height()) {
							$(this).closest("div").children("form").css({
								"margin-top": -$(this).closest("div").children("form").outerHeight()
							})
						}
						if($(this).closest("div").children("form").offset().left + $(this).closest("div").children("form").outerWidth() > $(window).width()) {
							$(this).closest("div").children("form").css({
								"margin-left": -$(this).closest("div").children("form").outerWidth()
							})
						}
						$(this).closest("div").children("form").children("textarea").focus();
						$(this).closest("div").closest("li").closest("ul").children("li").children("div").addClass("zindex")
					}
					$("span.submit").click(function() {
						var t = $(this);
						if(t.closest("form").find("textarea").val() != "") {
							var n;
							if(t.closest("li").children("ul").length > 0) {
								n = parseInt(t.closest("li").children("ul").children("li").last().children("div").attr("id")) + 1
							} else {
								n = t.closest("div").attr("id") + 1
							}
							var r = 'data={"action":"add", "id":"' + n + '", "html":"' + t.closest("form").find("textarea").val().replace(/\s+/g, " ") + '", "parentid":"' + t.closest("div").attr("id") + '", "showhideval":"' + t.closest("form").find("input:checked").length + '"}';
							t.closest("li").before("<img src='resources/images/load.gif' class='load' />");
							var i = "<li>" + c + h + '<div id="' + n + '">' + m + p + v + d + t.closest("form").find("textarea").val() + "</div></li>";
							t.closest("li").children("ul").length > 0 ? t.closest("li").children("ul").append(i) : t.closest("li").append("<ul>" + i + "</ul>");
							t.closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
							t.closest("form.add_data").remove();
							$("li > div.zindex").removeClass("zindex");
							A();
							M();
							$("img.load").remove();
							$("body").prepend('<div class="add_msg">Add Successfully...</div>');
							$("div.add_msg").animate({
								top: 200
							}, 4e3, function() {
								$(this).remove()
							})
						} else {
							t.closest("form").find("textarea").addClass("error")
						}
					});
					$("img.close").click(function() {
						$(this).closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
						$(this).closest("form.add_data").remove();
						$("li > div.zindex").removeClass("zindex")
					})
				})
			}
			if(s) {
				$("." + g + " span.delete_action").live("click", function() {
					var t = $(this);
					var n = $(this).closest("li").closest("ul").closest("li");
					confirm_message = 1;
					if(o) {
						var r = $(this).closest("li").children("ul").length == 0 ? "Deleat This ?" : "Deleat This with\nAll Child Element ?";
						confirm_message = confirm(r)
					}
					if(confirm_message) {
						$(this).closest("li").addClass("ajax_delete_all");
						ajax_delete_id = Array();
						ajax_delete_id.push($(this).closest("div").attr("id"));
						$(".ajax_delete_all li").each(function() {
							ajax_delete_id.push($(this).children("div").attr("id"))
						});
						$(this).closest("li").removeClass("ajax_delete_all");
						var i = 'data={"action":"delete", "id":"' + ajax_delete_id + '"}';
						$(this).closest("li").before("<img src='resources/images/load.gif' class='load' />");
						$("img.load").remove();
						t.closest("li").fadeOut().remove();
						A();
						if(n.children("ul").children("li").length == 0) n.children("ul").remove();
						$("body").prepend('<div class="delete_msg">Delete Successfully...</div>');
						$("div.delete_msg").animate({
							top: 200
						}, 4e3, function() {
							$(this).remove()
						})
					}
				})
			}
			if(i) {
				$("." + g + " span.edit_action").live("click", function() {
					if($("form.add_data").length > 0) $("form.add_data").remove();
					if($("form.edit_data").length > 0) $("form.edit_data").remove();
					var t = $(this).closest("div").clone();
					if(t.children("span.highlight").length > 0) t.children("span.highlight").remove();
					if(t.children("span.delete_action").length > 0) t.children("span.delete_action").remove();
					if(t.children("span.add_action").length > 0) t.children("span.add_action").remove();
					if(t.children("span.edit_action").length > 0) t.children("span.edit_action").remove();
					if(t.children("b.hide").length > 0) t.children("b.hide").remove();
					var n = $(this).closest("li").hasClass("hide") ? "checked" : "";
					var r = '<form class="edit_data"><img class="close" src="resources/images/close.png" /><h3>Edit Detail</h3><textarea>' + t.html() + '</textarea><input type="checkbox" ' + n + ' value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="edit">Save</span></form>';
					if($(this).closest("div").children("form.edit_data").length == 0) {
						$(this).closest("div").append(r);
						if($(this).closest("div").children("form").offset().top + $(this).closest("div").children("form").outerHeight() > $(window).height()) {
							$(this).closest("div").children("form").css({
								"margin-top": -$(this).closest("div").children("form").outerHeight()
							})
						}
						if($(this).closest("div").children("form").offset().left + $(this).closest("div").children("form").outerWidth() > $(window).width()) {
							$(this).closest("div").children("form").css({
								"margin-left": -$(this).closest("div").children("form").outerWidth()
							})
						}
						$(this).closest("div").children("form").children("textarea").select();
						$(this).closest("div").closest("li").closest("ul").children("li").children("div").addClass("zindex")
					}
					$("span.edit").click(function() {
						var t = $(this);
						if(t.closest("form").find("textarea").val() != "") {
							var n = 'data={"action":"edit", "id":"' + t.closest("div").attr("id") + '", "html":"' + t.closest("form").find("textarea").val().replace(/\s+/g, " ") + '", "showhideval":"' + t.closest("form").find("input:checked").length + '"}';
							t.closest("li").before("<img src='resources/images/load.gif' class='load' />");
							if(t.closest("form").find("input:checked").length > 0) {
								if(t.closest("li").hasClass("hide") == false) {
									t.closest("div").find("b.hide").trigger("click")
								}
							} else {
								if(t.closest("li").hasClass("hide")) {
									t.closest("div").find("b.hide").trigger("click")
								}
							}
							var r = t.closest("form.edit_data").closest("div");
							var i = "";
							i = t.closest("form").find("textarea").val();
							r.children("span.edit_action").nextAll().remove();
							if(r.text().length > 0) r.html(r.html().replace(r.text(), ""));
							r.append(i);
							r.children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
							$("li > div.zindex").removeClass("zindex");
							A();
							$("img.load").remove();
							$("body").prepend('<div class="edit_msg">Edit Successfully...</div>');
							$("div.edit_msg").animate({
								top: 200
							}, 4e3, function() {
								$(this).remove()
							})
						} else {
							t.closest("form").find("textarea").addClass("error")
						}
					});
					$("img.close").click(function() {
						$(this).closest("form.edit_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
						$(this).closest("form.edit_data").remove();
						$("li > div.zindex").removeClass("zindex")
					})
				})
			}
			if(l) {
				function M() {
					$("." + g + " li > div").draggable({
						cursor: "move",
						distance: 40,
						zIndex: 5,
						revert: true,
						revertDuration: 100,
						snap: ".tree li div",
						snapMode: "inner",
						start: function(t, n) {
							$("li.li_children").removeClass("li_children");
							$(this).closest("li").addClass("li_children")
						},
						stop: function(t, n) {
							var r = _();
							if(r == undefined) {
								$("body").prepend('<div class="drag_error">Drag it Correctly...</div>');
								$("div.drag_error").animate({
									top: 200
								}, 4e3, function() {
									$(this).remove()
								})
							}
						}
					})
				}

				function _() {
					$("." + g + " li > div").droppable({
						accept: ".tree li div",
						drop: function(t, n) {
							$("div.check_div").removeClass("check_div");
							$(".li_children div").addClass("check_div");
							if($(this).hasClass("check_div")) {
								alert("Cant Move on Child Element.")
							} else {
								var r = 'data={"action":"drag", "id":"' + $(n.draggable[0]).attr("id") + '", "parentid":"' + $(this).attr("id") + '"}';
								$(this).next("ul").length == 0 ? $(this).after("<ul><li>" + $(n.draggable[0]).attr({
									style: ""
								}).closest("li").html() + "</li></ul>") : $(this).next("ul").append("<li>" + $(n.draggable[0]).attr({
									style: ""
								}).closest("li").html() + "</li>");
								$(n.draggable[0]).closest("ul").children("li").length == 1 ? $(n.draggable[0]).closest("ul").remove() : $(n.draggable[0]).closest("li").remove();
								A();
								M();
								$("body").prepend('<div class="drop_msg">Drag Successfully...</div>');
								$("div.drop_msg").animate({
									top: 200
								}, 4e3, function() {
									$(this).remove()
								})
							}
						}
					})
				}
				$("." + g + " li > div").disableSelection();
				M()
			}
		})
	}
})(jQuery)