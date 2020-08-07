// SELECTOR
const homeSlider = document.getElementById("home");
const servicesSelector = document.getElementById("services");
const aboutDOM = document.getElementById("about");
const testimonyDOM = document.getElementById("testimony");
const teamDOM = document.getElementById("team");
const contactDOM = document.getElementById("contact");
const projectDOM = document.getElementById("projects");
const socialDOM = document.getElementById("social");
const colorProperty = document.documentElement.style;

(function main() {
  //PROJECTS
  fetch("/projects")
    .then((res) => res.json())
    .then((data) => {
      //HOME
      const home = data.map(
        (item) => `
      <div
        class="item bg-img"
        data-overlay-dark="3"
        data-background="${item.images[0].url}"
      >
        <div class="container text-center v-middle caption">
          <h4>${item.type}</h4>
          <h1>${item.title}</h1>
          <a href="project.html#id=${item.id}" class="btn"
            ><span>Discover More <i class="fas fa-arrow-right"></i></span
          ></a>
        </div>
      </div>`
      );
      home.map((item) => (homeSlider.innerHTML += item));

      //PROJECT
      const project = data.map(
        (item) => `
      <div class="item mb-50">
        <div class="position-re o-hidden">
          <img src="${item.images[0].url}" alt="" />
        </div>
        <div class="con">
          <span class="category">
            <a href="project.html#id=${item.id}">${item.type}</a>
          </span>
          <h5><a href="project.html#id=${item.id}">${item.title}</a></h5>
          <a href="project.html#id=${item.id}"><i class="ti-arrow-right"></i></a>
        </div>
      </div>`
      );
      project.forEach((item) => (projectDOM.innerHTML += item));
    })
    .then(() => {
      //SLIDER
      var owl = $(".header .owl-carousel");
      // Slider owlCarousel
      $(".slider .owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        margin: 0,
        autoplay: true,
        smartSpeed: 500,
        animateOut: "fadeOut",
      });
      // Slider owlCarousel
      $(".slider-fade .owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        margin: 0,
        autoplay: true,
        smartSpeed: 500,
        animateOut: "fadeOut",
      });
      owl.on("changed.owl.carousel", function (event) {
        var item = event.item.index - 2; // Position of the current item
        $(".image-logo").removeClass("animated fadeInDown");
        $("h4").removeClass("animated fadeInUp");
        $("h1").removeClass("animated fadeInUp");
        $("p").removeClass("animated fadeInUp");
        $(".btn").removeClass("animated zoomIn");
        $(".owl-item")
          .not(".cloned")
          .eq(item)
          .find(".image-logo")
          .addClass("animated fadeInDown");
        $(".owl-item")
          .not(".cloned")
          .eq(item)
          .find("h4")
          .addClass("animated fadeInUp");
        $(".owl-item")
          .not(".cloned")
          .eq(item)
          .find("h1")
          .addClass("animated fadeInUp");
        $(".owl-item")
          .not(".cloned")
          .eq(item)
          .find("p")
          .addClass("animated fadeInUp");
        $(".owl-item")
          .not(".cloned")
          .eq(item)
          .find(".btn")
          .addClass("animated zoomIn");
      });

      // Project owlCarousel
      $(".projects .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    })
    .catch((err) => console.error(err));

  //CONTENTS
  fetch("/content")
    .then((res) => res.json())
    .then((data) => {
      const {
        Services,
        About,
        Testimonies,
        Team,
        SocialMedia,
        Contact,
        colorTheme,
      } = data;

      //COLORTHEME
      colorProperty.setProperty("--primary-color", colorTheme.PrimaryColor);
      colorProperty.setProperty(
        "--background-color",
        colorTheme.BackgroundColor
      );
      colorProperty.setProperty("--sidebar-color", colorTheme.SidebarColor);
      colorProperty.setProperty("--content-lines", colorTheme.ContentLines);
      colorProperty.setProperty("--title-color", colorTheme.TitleColor);
      colorProperty.setProperty("--paragraph-color", colorTheme.ParagraphColor);
      colorProperty.setProperty("--team-overlay", colorTheme.TeamOverlay);

      //SOCIAL
      const social = SocialMedia.map(
        (item) => `
      <a href="${item.link}"><i class="fab fa-${item.social}"></i></a>`
      );
      social.map((item) => (socialDOM.innerHTML += item));

      //SERVICES
      const services = Services.map(
        (item, index) => `
        <div class="item mb-50">
          <div class="item1" style="background-image: url(${item.image.url})">
            <div class="con">
              <div class="numb">0${index + 1}</div>
              <h5>${item.title}</h5>
              <p>
                ${item.description}
              </p>
            </div>
          </div>
        </div>`
      );
      let markupServices = "";
      services.forEach((item) => (markupServices += item));
      servicesSelector.innerHTML = `
        <div class="col-md-12 mb-20 text-center">
          <h6 class="small-title">What We Do</h6>
          <h4 class="title">Our Services</h4>
        </div>
       <div class="owl-carousel owl-theme">
        ${markupServices}
       </div>`;

      //ABOUT
      const converter = new showdown.Converter();
      aboutDOM.innerHTML = `
        <div class="col-md-6 mb-20">
          <h6 class="small-title">About Us</h6>
          <h4 class="title">About Hument Studio</h4>
          ${converter.makeHtml(About.description)}
        </div>
        <div class="col-md-6 mb-20 image">
          <div class="img">
            <img src="assets/img/25.png" alt="" />
            <a
              class="vid"
              href="${About.url_youtube_video}"
            >
              <span class="vid-togo-button"
                ><i class="ti-control-play"></i
              ></span>
            </a>
          </div>
        </div>
        <div class="col-md-12">
          <div class="yearimg">
            <div class="numb">${About.experience}</div>
          </div>
          <div class="year">
            <h6 class="small-title">IN ARCHITECTURE DESIGN</h6>
            <h4 class="title">Years of Experience</h4>
          </div>
        </div>`;

      //TESTIMONIES
      const testimony = Testimonies.Testimonies.map(
        (item) => `
        <div class="item">
          <div class="client-area">
            <h6>${item.name}</h6>
            <span>${item.role}</span>
          </div>
          <p>
            " ${item.description} "
          </p>
        </div>`
      );
      let markupTestimony = "";
      testimony.forEach((item) => (markupTestimony += item));
      testimonyDOM.innerHTML = `
        <section
          class="testimonial bg-img bg-fixed pos-re mt-100 pt-100 pb-100"
          data-overlay-dark="6"
          data-background="${Testimonies.backgroundImage.url}"
        >
          <div class="container">
            <div class="row">
              <div class="col-md-6 offset-md-3">
                <div class="testimonials">
                  <span class="icon"
                    ><img src="assets/img/left-quote.png" alt=""
                  /></span>
                  <div class="owl-carousel owl-theme text-center">
                    ${markupTestimony}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>`;

      //TEAM
      const team = Team.map((item) => {
        let socialMarkup = "";
        item.Social.map(
          (soc) =>
            (socialMarkup += `
            <a href="${soc.link}" class="icon">
              <i class="fab fa-${soc.social}"></i>
            </a>`)
        );
        return `
        <div class="item">
          <div class="team-img">
            <img src="${item.image.url}" alt="" />
            <div class="info valign">
              <div class="text-center full-width">
                <div class="social">
                  ${socialMarkup}
                </div>
              </div>
            </div>
          </div>
          <h6>${item.name}</h6>
          <span>${item.role}</span>
        </div>`;
      });
      team.forEach((item) => (teamDOM.innerHTML += item));

      //CONTACT
      contactDOM.style.backgroundImage = `url(${Contact.image.url})`;
      contactDOM.innerHTML = `
      <div class="con" >
        <h5>${Contact.name}</h5>
        <p>
          <i class="ti-home" style="font-size: 15px; color: var(--primary-color);"></i>
          ${Contact.address}
        </p>
        <p>
          <i
            class="ti-mobile"
            style="font-size: 15px; color: var(--primary-color);"
          ></i>
          ${Contact.phone}
        </p>
        <p>
          <i
            class="ti-envelope"
            style="font-size: 15px; color: var(--primary-color);"
          ></i>
          ${Contact.email}
        </p>
      </div>`;
    })
    .then(() => {
      var burgerMenu = function () {
        $(".js-addo-nav-toggle").on("click", function (event) {
          event.preventDefault();
          var $this = $(this);
          if ($("body").hasClass("offcanvas")) {
            $this.removeClass("active");
            $("body").removeClass("offcanvas");
          } else {
            $this.addClass("active");
            $("body").addClass("offcanvas");
          }
        });
      };
      // Click outside of offcanvass
      var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
          var container = $("#addo-aside, .js-addo-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($("body").hasClass("offcanvas")) {
              $("body").removeClass("offcanvas");
              $(".js-addo-nav-toggle").removeClass("active");
            }
          }
        });
        $(window).scroll(function () {
          if ($("body").hasClass("offcanvas")) {
            $("body").removeClass("offcanvas");
            $(".js-addo-nav-toggle").removeClass("active");
          }
        });
      };
      var wind = $(window);
      // scroll
      $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: "swing", // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: "active", // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70, // offste (in px) for fixed top navigation
      });
      // Sections background image from data background
      var pageSection = $(".bg-img, section");
      pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
          $(this).css(
            "background-image",
            "url(" + $(this).data("background") + ")"
          );
        }
      });

      // Testimonials owlCarousel
      $(".carousel-single.owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
      });

      // Clients owlCarousel
      $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 60,
        mouseDrag: true,
        autoplay: true,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: {
            margin: 10,
            items: 2,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });

      // Team owlCarousel
      $(".team .owl-carousel").owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            autoplay: true,
          },
          600: {
            items: 2,
            autoplay: true,
          },
          1000: {
            items: 3,
            autoplay: false,
          },
        },
      });

      //Service Carousel
      $(".services .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });

      // Testimonials owlCarousel
      $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: true,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });

      // YouTubePopUp
      $("a.vid").YouTubePopUp();
    })
    .catch((err) => console.log(err));
  // === window When Loading === //
  $(window).on("load", function () {
    var wind = $(window);
    // Preloader
    setTimeout(function () {
      $("#loader").fadeOut(200);
    }, 200);
    // stellar
    wind.stellar();
    // contact form validator
    $("#contact-form").validator();
    $("#contact-form").on("submit", function (e) {
      if (!e.isDefaultPrevented()) {
        var url = "contact.php";
        $.ajax({
          type: "POST",
          url: url,
          data: $(this).serialize(),
          success: function (data) {
            var messageAlert = "alert-" + data.type;
            var messageText = data.message;
            var alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              "</div>";
            if (messageAlert && messageText) {
              $("#contact-form").find(".messages").html(alertBox);
              $("#contact-form")[0].reset();
            }
          },
        });
        return false;
      }
    });
  });
})();
