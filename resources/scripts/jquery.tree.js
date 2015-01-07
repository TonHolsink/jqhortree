(function($) {
	$.fn.tree_structure = function(custom_options) {
		var options = {
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
			function create_node($e) {
				$e.prepend(vert_span + hor_span).children("div").prepend(add_span + delete_span + edit_span);
				if($e.children("ul").length != 0) $e.hasClass("hide") ? $e.children("div").prepend('<b class="hide show"></b>') : $e.children("div").prepend('<b class="hide"></b>');
				$e.children("div").prepend(click_span)
			}

			function position_lines($e) {
				var t = $e.children("div").outerWidth(true) / 2;
				var n = $e.children("div").offset().left;
				if($e.parents("li").offset() != null) var r = $e.parents("li").offset().top;
				vertical_height = $e.offset().top - r - $e.parents("li").children("div").outerHeight(true) / 2;
				$e.children("span.vertical").css({
					height: vertical_height,
					"margin-top": -vertical_height,
					"margin-left": t,
					left: n
				});
				if($e.parents("li").offset() == null) {
					var i = 0
				} else {
					var s = $e.parents("li").children("div").offset().left + $e.parents("li").children("div").width() / 2;
					var o = n + $e.children("div").width() / 2;
					var i = s - o
				}
				var u = i < 0 ? -Math.abs(i) + t : t;
				$e.children("span.horizontal").css({
					width: Math.abs(i),
					"margin-top": -vertical_height,
					"margin-left": u,
					left: n
				})
			}

			function redraw() {
				$("." + treeClass + " li").each(function() {
					if(state == "pageload") create_node($(this));
					position_lines($(this))
				})
			}

			function O($e) {
				if($e.length > 0) {
					$e.children("div").addClass("parent");
					$ = $e.closest("li").closest("ul").closest("li");
					return O($)
				}
			}
			if(custom_options) $.extend(options, custom_options);
			var option_add = options["add_option"];
			var option_edit = options["edit_option"];
			var option_delete = options["delete_option"];
			var option_confirm_before_delete = options["confirm_before_delete"];
			var option_animate = options["animate_option"];
			var option_fullwidth = options["fullwidth_option"];
			var option_align = options["align_option"];
			var option_draggable = options["draggable_option"];
			var vert_span = '<span class="vertical"></span>';
			var hor_span = '<span class="horizontal"></span>';
			var add_span = option_add == true ? '<span class="add_action" title="Click for Add"></span>' : "";
			var edit_span = option_edit == true ? '<span class="edit_action" title="Click for Edit"></span>' : "";
			var delete_span = option_delete == true ? '<span class="delete_action" title="Click for Delete"></span>' : "";
			var click_span = '<span class="highlight" title="Click for Highlight | dblClick"></span>';
			var treeClass = $(this).attr("class");
			var state = "pageload";
			if(option_align != "center") $("." + treeClass + " li").css({
				"text-align": option_align
			});
			if(option_fullwidth) {
				var b = 0;
				var w;
				var $e;
				$("." + treeClass + " li li").each(function() {
					var t = $(this).width();
					if(b == 0 || t > w) {
						w = $(this).width();
						$e = $(this)
					}
					b++
				});
				var S = $e.closest("ul").children("li").eq(0).nextAll().length;
				var x = parseInt(0);
				for($i = 0; $i <= S; $i++) {
					x += parseInt($e.closest("ul").children("li").eq($i).width())
				}
				$("." + treeClass + "").closest("div").width(x)
			}
			$("." + treeClass + " li.hide").each(function() {
				$(this).children("ul").hide()
			});
			if(option_animate[0] == true) {
				function C() {
					$timeout = setInterval(function() {
						L()
					}, option_animate[1])
				}
				var k = $("." + treeClass + " li").length;
				var b = 0;

				function L() {
					create_node($("." + treeClass + " li").eq(b));
					position_lines($("." + treeClass + " li").eq(b));
					b++;
					if(b == k) {
						b = 0;
						clearInterval($timeout)
					}
				}
			}
			option_animate[0] ? C() : redraw();
			state = "others";
			$(window).resize(function() {
				redraw()
			});
			$("." + treeClass + " b.hide").live("click", function() {
				$(this).toggleClass("show");
				$(this).closest("li").toggleClass("hide").children("ul").toggle();
				redraw()
			});
			$("." + treeClass + " li > div").live("hover", function(event) {
				if(event.type == "mouseenter" || event.type == "mouseover") {
					$("." + treeClass + " li > div.current").removeClass("current");
					$("." + treeClass + " li > div.children").removeClass("children");
					$("." + treeClass + " li > div.parent").removeClass("parent");
					$(this).addClass("current");
					$(this).closest("li").children("ul").children("li").children("div").addClass("children");
					$(this).closest("li").closest("ul").closest("li").children("div").addClass("parent");
					$(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").show()
				} else {
					$(this).children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide()
				}
			});
			$("." + treeClass + " span.highlight").live("click", function() {
				$("." + treeClass + " li.highlight").removeClass("highlight");
				$("." + treeClass + " li > div.parent").removeClass("parent");
				$("." + treeClass + " li > div.children").removeClass("children");
				$(this).closest("li").addClass("highlight");
				$(".highlight li > div").addClass("children");
				var t = $(this).closest("li").closest("ul").closest("li");
				O(t)
			});
			$("." + treeClass + " span.highlight").live("dblclick", function() {
				if(option_fullwidth) $("." + treeClass + "").parent("div").parent("div").scrollLeft(0);
				$("." + treeClass + " li > div").not(".parent, .current, .children").closest("li").addClass("none");
				$("." + treeClass + " li div b.hide.show").closest("div").closest("li").children("ul").addClass("show");
				$("." + treeClass + " li div b.hide").addClass("none");
				$("body").prepend('<img src="resources/images/back.png" class="back_btn" />');
				redraw();
				$(".back_btn").click(function() {
					$("." + treeClass + " ul.show").removeClass("show");
					$("." + treeClass + " li.none").removeClass("none");
					$("." + treeClass + " li div b.hide").removeClass("none");
					$(this).remove();
					redraw()
				})
			});
			if(option_add) {
				$("." + treeClass + " span.add_action").live("click", function() {
					if($("form.add_data").length > 0) $("form.add_data").remove();
					if($("form.edit_data").length > 0) $("form.edit_data").remove();
					var add_form = '<form class="add_data"><img class="close" src="resources/images/close.png" /><h3>Add Detail</h3><textarea></textarea><input type="checkbox" value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="submit">Submit</span></form>';
					if($(this).closest("div").children("form.add_data").length == 0) {
						$(this).parent("div").append(add_form);
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
						var $this = $(this);
						if($this.closest("form").find("textarea").val() != "") {
							var n;
							if($this.closest("li").children("ul").length > 0) {
								n = parseInt($this.closest("li").children("ul").children("li").last().children("div").attr("id")) + 1
							} else {
								n = $this.closest("div").attr("id") + 1
							}
							var r = 'data={"action":"add", "id":"' + n + '", "html":"' + $this.closest("form").find("textarea").val().replace(/\s+/g, " ") + '", "parentid":"' + $this.closest("div").attr("id") + '", "showhideval":"' + $this.closest("form").find("input:checked").length + '"}';
							$this.closest("li").before("<img src='resources/images/load.gif' class='load' />");
							var i = "<li>" + vert_span + hor_span + '<div id="' + n + '">' + click_span + add_span + delete_span + edit_span + $this.closest("form").find("textarea").val() + "</div></li>";
							$this.closest("li").children("ul").length > 0 ? $this.closest("li").children("ul").append(i) : $this.closest("li").append("<ul>" + i + "</ul>");
							$this.closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
							$this.closest("form.add_data").remove();
							$("li > div.zindex").removeClass("zindex");
							redraw();
							drag_init();
							$("img.load").remove();
							$("body").prepend('<div class="add_msg">Add Successfully...</div>');
							$("div.add_msg").animate({
								top: 200
							}, 4e3, function() {
								$(this).remove()
							})
						} else {
							$this.closest("form").find("textarea").addClass("error")
						}
					});
					$("img.close").click(function() {
						$(this).closest("form.add_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
						$(this).closest("form.add_data").remove();
						$("li > div.zindex").removeClass("zindex")
					})
				})
			}
			if(option_delete) {
				$("." + treeClass + " span.delete_action").live("click", function() {
					var $this = $(this);
					var n = $(this).closest("li").closest("ul").closest("li");
					confirm_message = 1;
					if(option_confirm_before_delete) {
						var msg = $(this).closest("li").children("ul").length == 0 ? "Delete This ?" : "Delete This with\nAll Child Elements ?";
						confirm_message = confirm(msg)
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
						$this.closest("li").fadeOut().remove();
						redraw();
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
			if(option_edit) {
				$("." + treeClass + " span.edit_action").live("click", function() {
					if($("form.add_data").length > 0) $("form.add_data").remove();
					if($("form.edit_data").length > 0) $("form.edit_data").remove();
					var t = $(this).closest("div").clone();
					if(t.children("span.highlight").length > 0) t.children("span.highlight").remove();
					if(t.children("span.delete_action").length > 0) t.children("span.delete_action").remove();
					if(t.children("span.add_action").length > 0) t.children("span.add_action").remove();
					if(t.children("span.edit_action").length > 0) t.children("span.edit_action").remove();
					if(t.children("b.hide").length > 0) t.children("b.hide").remove();
					var n = $(this).closest("li").hasClass("hide") ? "checked" : "";
					var edit_form = '<form class="edit_data"><img class="close" src="resources/images/close.png" /><h3>Edit Detail</h3><textarea>' + t.html() + '</textarea><input type="checkbox" ' + n + ' value="" id="hide" /> <label for="hide">Hide Child Nodes</label><span class="edit">Save</span></form>';
					if($(this).closest("div").children("form.edit_data").length == 0) {
						$(this).closest("div").append(edit_form);
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
						var $this = $(this);
						if($this.closest("form").find("textarea").val() != "") {
							var n = 'data={"action":"edit", "id":"' + $this.closest("div").attr("id") + '", "html":"' + $this.closest("form").find("textarea").val().replace(/\s+/g, " ") + '", "showhideval":"' + $this.closest("form").find("input:checked").length + '"}';
							$this.closest("li").before("<img src='resources/images/load.gif' class='load' />");
							if($this.closest("form").find("input:checked").length > 0) {
								if($this.closest("li").hasClass("hide") == false) {
									$this.closest("div").find("b.hide").trigger("click")
								}
							} else {
								if($this.closest("li").hasClass("hide")) {
									$this.closest("div").find("b.hide").trigger("click")
								}
							}
							var r = $this.closest("form.edit_data").closest("div");
							var i = "";
							i = $this.closest("form").find("textarea").val();
							r.children("span.edit_action").nextAll().remove();
							if(r.text().length > 0) r.html(r.html().replace(r.text(), ""));
							r.append(i);
							r.children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
							$("li > div.zindex").removeClass("zindex");
							redraw();
							$("img.load").remove();
							$("body").prepend('<div class="edit_msg">Edit Successfully...</div>');
							$("div.edit_msg").animate({
								top: 200
							}, 4e3, function() {
								$(this).remove()
							})
						} else {
							$this.closest("form").find("textarea").addClass("error")
						}
					});
					$("img.close").click(function() {
						$(this).closest("form.edit_data").closest("div").children("span.highlight, span.add_action, span.delete_action, span.edit_action").hide();
						$(this).closest("form.edit_data").remove();
						$("li > div.zindex").removeClass("zindex")
					})
				})
			}
			if(option_draggable) {
				function drag_init() {
					$("." + treeClass + " li > div").draggable({
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
					$("." + treeClass + " li > div").droppable({
						accept: ".tree li div",
						drop: function(t, n) {
							$("div.check_div").removeClass("check_div");
							$(".li_children div").addClass("check_div");
							if($(this).hasClass("check_div")) {
								alert("Cant Move on Child Element.")
							} else {
								var data = 'data={"action":"drag", "id":"' + $(n.draggable[0]).attr("id") + '", "parentid":"' + $(this).attr("id") + '"}';
								$(this).next("ul").length == 0 ? $(this).after("<ul><li>" + $(n.draggable[0]).attr({
									style: ""
								}).closest("li").html() + "</li></ul>") : $(this).next("ul").append("<li>" + $(n.draggable[0]).attr({
									style: ""
								}).closest("li").html() + "</li>");
								$(n.draggable[0]).closest("ul").children("li").length == 1 ? $(n.draggable[0]).closest("ul").remove() : $(n.draggable[0]).closest("li").remove();
								redraw();
								drag_init();
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
				$("." + treeClass + " li > div").disableSelection();
				drag_init()
			}
		})
	}
})(jQuery)