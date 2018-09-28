//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("ADM requires jQuery");
}

$.ADM = {};

$.ADM.options = {
  //Add slimscroll to body
  bodySlimscroll: true,
  bodySlimscrollWidth: "3px", //The width of the scroll bar
  bodyHeight: "100vh", //The height of the inner body
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This option accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  enableControlTreeView: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'mdi-minus',
      //Open icon
      open: 'mdi-plus',
      //Remove icon
      remove: 'mdi-close'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements ADM's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof ADMOptions !== "undefined") {
    $.extend(true,
      $.ADM.options,
      ADMOptions);
  }

  //Easy access to options
  var o = $.ADM.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.ADM.layout.activate();

  //Enable sidebar tree view controls
  if (o.enableControlTreeView) {
    $.ADM.tree('.sidebar');
  }

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.ADM.controlSidebar.activate();
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.ADM.boxWidget.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Add slimscroll to body
  /*if (o.bodySlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $("body").slimscroll({
      height: o.bodyHeight,
      alwaysVisible: false,
      size: o.bodySlimscrollWidth
    }).css("width", "100%");
  }*/

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.ADM.pushMenu.activate(o.sidebarToggleSelector);
	$(".main-menu").slimScroll({
		height: ($(window).height() - ($(".main-header").height() + 122)) + "px",
		color: "rgba(0,0,0,1)",
		size: "3px"
	});
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }
});

/* ----------------------------------
 * - Initialize the ADM Object -
 * ----------------------------------
 * All ADM functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.ADM.layout.activate()
   *        $.ADM.layout.fixSidebar()
   */
  $.ADM.layout = {
    activate: function () {
      var _this = this;
      _this.fixSidebar();
      $('body, html, .wrapper').css('height', 'auto');
      $(window, ".wrapper").resize(function () {
        _this.fixSidebar();
      });
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //$(".sidebar").slimScroll({destroy: true}).height("auto");
          $(".sidebar").slimScroll({destroy: true});
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.ADM.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimScroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.ADM.pushMenu("[data-toggle='offcanvas']")
   */
  $.ADM.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.ADM.options.screenSizes;

      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();
		
        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
			//$(".sidebar").css("overflow: hidden");
			if (typeof $.fn.slimScroll != 'undefined') {
			  //Destroy if it exists
			  $(".main-menu").slimScroll({destroy: true}).height("auto");
			  //Add slimscroll
			  $(".main-menu").slimScroll({
				height: ($(window).height() - ($(".main-header").height() + 122)) + "px",
				color: "rgba(0,0,0,1)",
				size: "3px"
			  });
			}
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
			$(".main-menu").slimScroll({destroy: true}).removeAttr('style');
          }
        }
		
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
			if (typeof $.fn.slimScroll != 'undefined') {
			  //Destroy if it exists
			  $(".main-menu").slimScroll({destroy: true}).height("auto");
			  //Add slimscroll
			  $(".main-menu").slimScroll({
				height: ($(window).height() - ($(".main-header").height() + 122)) + "px",
				color: "rgba(0,0,0,1)",
				size: "3px"
			  });
			}
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.ADM.tree('.sidebar')
   */
  $.ADM.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.ADM.options.animationSpeed;
    $(document).off('click', menu + ' li a').on('click', menu + ' li a', function (e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
          //Close the menu
          checkElement.slideUp(animationSpeed, function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.ADM.controlSidebar.activate(options)
   */
  $.ADM.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.ADM.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
          && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });
	  var bg = $(".control-sidebar-bg");
      _this._fix(bg);
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        if (_this.hasBindedResize) {
          return;
        }
        $(window).resize(function () {
          _this._fix(sidebar);
        });
        _this.hasBindedResize = true;
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    }
   
  };
  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.ADM.boxWidget.activate()
   *        Set all your options in the main $.ADM.options object
   */
  $.ADM.boxWidget = {
    selectors: $.ADM.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.ADM.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.ADM.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
          .removeClass(_this.icons.collapse)
          .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
          .removeClass(_this.icons.open)
          .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}
