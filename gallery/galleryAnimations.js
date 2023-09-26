/**************/
/*SMOOTH SROLL*/
/**************/
 
 //this is where we apply opacity to the arrow
 $(window).scroll(function () {
    //get scroll position
    var topWindow = $(window).scrollTop();
    //multipl by 1.5 so the arrow will become transparent half-way up the page
    var topWindow = topWindow * 1.5;

    //get height of window
    var windowHeight = $(window).height();

    //set position as percentage of how far the user has scrolled
    var position = topWindow / windowHeight;
    //invert the percentage
    position = 1 - position;

    //define arrow opacity as based on how far up the page the user has scrolled
    //no scrolling = 1, half-way up the page = 0
    $(".arrow-wrap").css("opacity", position);
  });


  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });


/*********/
/*YOUTUBE*/
/*********/

"use strict";
    $(function() {
        $(".youtube").each(function() {
            // Based on the YouTube ID, we can easily find the thumbnail image
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
        
            // Overlay the Play icon to make it look like a video player
            $(this).append($('<div/>', {'class': 'play'}));
        
            $(document).delegate('#'+this.id, 'click', function() {
                // Create an iFrame with autoplay set to true
                var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
                if ($(this).data('params')) iframe_url+='&'+$(this).data('params');
        
                // The height and width of the iFrame should be the same as parent
                var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })
        
                // Replace the YouTube thumbnail with YouTube HTML5 Player
                $(this).replaceWith(iframe);
            });
        });
    });


// Get nav to the page
$('#navbarGallery').load('../tempalte/navbarGallery.html');


/***********/
/*LAVA LAMP*/
/***********/

window.lavaAnimation = (function () {
  "use strict";
  var t,
    i = {
      screen: {
        elem: null,
        callback: null,
        ctx: null,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        init: function (t, i, s) {
          return (
            (this.elem = document.getElementById(t)),
            (this.callback = i || null),
            "CANVAS" == this.elem.tagName &&
              (this.ctx = this.elem.getContext("2d")),
            window.addEventListener(
              "resize",
              function () {
                this.resize();
              }.bind(this),
              !1
            ),
            (this.elem.onselectstart = function () {
              return !1;
            }),
            (this.elem.ondrag = function () {
              return !1;
            }),
            s && this.resize(),
            this
          );
        },
        resize: function () {
          var t = this.elem;
          for (
            this.width = t.offsetWidth,
              this.height = t.offsetHeight,
              this.left = 0,
              this.top = 0;
            null != t;
            t = t.offsetParent
          )
            (this.left += t.offsetLeft), (this.top += t.offsetTop);
          this.ctx &&
            ((this.elem.width = this.width),
            (this.elem.height = this.height)),
            this.callback && this.callback();
        },
      },
    },
    s = function (t, i) {
      (this.x = t),
        (this.y = i),
        (this.magnitude = t * t + i * i),
        (this.computed = 0),
        (this.force = 0);
    };
  s.prototype.add = function (t) {
    return new s(this.x + t.x, this.y + t.y);
  };
  var h = function (t) {
    var i = 0.1,
      h = 1.5;
    (this.vel = new s(
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + 0.25 * Math.random()),
      (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
    )),
      (this.pos = new s(
        0.2 * t.width + Math.random() * t.width * 0.6,
        0.2 * t.height + Math.random() * t.height * 0.6
      )),
      (this.size =
        t.wh / 15 + (Math.random() * (h - i) + i) * (t.wh / 15)),
      (this.width = t.width),
      (this.height = t.height);
  };
  h.prototype.move = function () {
    this.pos.x >= this.width - this.size
      ? (this.vel.x > 0 && (this.vel.x = -this.vel.x),
        (this.pos.x = this.width - this.size))
      : this.pos.x <= this.size &&
        (this.vel.x < 0 && (this.vel.x = -this.vel.x),
        (this.pos.x = this.size)),
      this.pos.y >= this.height - this.size
        ? (this.vel.y > 0 && (this.vel.y = -this.vel.y),
          (this.pos.y = this.height - this.size))
        : this.pos.y <= this.size &&
          (this.vel.y < 0 && (this.vel.y = -this.vel.y),
          (this.pos.y = this.size)),
      (this.pos = this.pos.add(this.vel));
  };
  var e = function (t, i, e, n, a) {
    (this.step = 5),
      (this.width = t),
      (this.height = i),
      (this.wh = Math.min(t, i)),
      (this.sx = Math.floor(this.width / this.step)),
      (this.sy = Math.floor(this.height / this.step)),
      (this.paint = !1),
      (this.metaFill = r(t, i, t, n, a)),
      (this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0]),
      (this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1]),
      (this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0]),
      (this.ix = [
        1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1,
      ]),
      (this.grid = []),
      (this.balls = []),
      (this.iter = 0),
      (this.sign = 1);
    for (var o = 0; o < (this.sx + 2) * (this.sy + 2); o++)
      this.grid[o] = new s(
        (o % (this.sx + 2)) * this.step,
        Math.floor(o / (this.sx + 2)) * this.step
      );
    for (var l = 0; e > l; l++) this.balls[l] = new h(this);
  };
  (e.prototype.computeForce = function (t, i, s) {
    var h,
      e = s || t + i * (this.sx + 2);
    if (0 === t || 0 === i || t === this.sx || i === this.sy)
      h = 0.6 * this.sign;
    else {
      h = 0;
      for (var r, n = this.grid[e], a = 0; (r = this.balls[a++]); )
        h +=
          (r.size * r.size) /
          (-2 * n.x * r.pos.x -
            2 * n.y * r.pos.y +
            r.pos.magnitude +
            n.magnitude);
      h *= this.sign;
    }
    return (this.grid[e].force = h), h;
  }),
    (e.prototype.marchingSquares = function (t) {
      var i = t[0],
        s = t[1],
        h = t[2],
        e = i + s * (this.sx + 2);
      if (this.grid[e].computed === this.iter) return !1;
      for (var r, n = 0, a = 0; 4 > a; a++) {
        var l =
            i + this.ix[a + 12] + (s + this.ix[a + 16]) * (this.sx + 2),
          d = this.grid[l].force;
        ((d > 0 && this.sign < 0) || (0 > d && this.sign > 0) || !d) &&
          (d = this.computeForce(
            i + this.ix[a + 12],
            s + this.ix[a + 16],
            l
          )),
          Math.abs(d) > 1 && (n += Math.pow(2, a));
      }
      if (15 === n) return [i, s - 1, !1];
      5 === n
        ? (r = 2 === h ? 3 : 1)
        : 10 === n
        ? (r = 3 === h ? 0 : 2)
        : ((r = this.mscases[n]), (this.grid[e].computed = this.iter));
      var p =
        this.step /
        (Math.abs(
          Math.abs(
            this.grid[
              i +
                this.plx[4 * r + 2] +
                (s + this.ply[4 * r + 2]) * (this.sx + 2)
            ].force
          ) - 1
        ) /
          Math.abs(
            Math.abs(
              this.grid[
                i +
                  this.plx[4 * r + 3] +
                  (s + this.ply[4 * r + 3]) * (this.sx + 2)
              ].force
            ) - 1
          ) +
          1);
      return (
        o.lineTo(
          this.grid[
            i + this.plx[4 * r] + (s + this.ply[4 * r]) * (this.sx + 2)
          ].x +
            this.ix[r] * p,
          this.grid[
            i +
              this.plx[4 * r + 1] +
              (s + this.ply[4 * r + 1]) * (this.sx + 2)
          ].y +
            this.ix[r + 4] * p
        ),
        (this.paint = !0),
        [i + this.ix[r + 4], s + this.ix[r + 8], r]
      );
    }),
    (e.prototype.renderMetaballs = function () {
      for (var t, i = 0; (t = this.balls[i++]); ) t.move();
      for (
        this.iter++,
          this.sign = -this.sign,
          this.paint = !1,
          o.fillStyle = this.metaFill,
          o.beginPath(),
          i = 0;
        (t = this.balls[i++]);

      ) {
        var s = [
          Math.round(t.pos.x / this.step),
          Math.round(t.pos.y / this.step),
          !1,
        ];
        do s = this.marchingSquares(s);
        while (s);
        this.paint &&
          (o.fill(), o.closePath(), o.beginPath(), (this.paint = !1));
      }
    });
    
  var r = function (t, i, s, h, e) {
    var r = o.createRadialGradient(t / 1, i / 1, 0, t / 1, i / 1, s);
    return r.addColorStop(0, h), r.addColorStop(1, e), r;
  };
  if (document.getElementById("lavaLampAnimation")) {
    var n = function () {
        requestAnimationFrame(n),
          o.clearRect(0, 0, a.width, a.height),
          t.renderMetaballs();
      },
      a = i.screen.init("lavaLampAnimation", null, !0),
      o = a.ctx;
    a.resize(), (t = new e(a.width, a.height, 6, "black", "black"));
  }
  return { run: n };
})();

if (document.getElementById("lavaLampAnimation")) {
  lavaAnimation.run();
}
setTimeout(function () {
  $(".js-works-d-list").addClass("is-loaded");
}, 150);