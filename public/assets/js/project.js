const projectItem = document.getElementById("project-item");
const projectId = window.location.hash;
const socialDOM = document.getElementById("social");
const colorProperty = document.documentElement.style;

const id = projectId.split("=")[1];

const converter = new showdown.Converter();

(function mainProject() {
  fetch("/content")
    .then((res) => res.json())
    .then((data) => {
      const { SocialMedia, colorTheme } = data;

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
    })
    .catch((err) => console.log(err));

  fetch(`/projects/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let images = "";
      data.images.forEach(
        (item) =>
          (images += `<div class="col-md-6">
                            <div class="post-img">
                            <div class="img">
                                <a href="${item.url}" title="${item.name}">
                                  <img src="${item.url}" alt="" />
                                </a>
                            </div>
                            </div>
                        </div>`)
      );

      projectItem.innerHTML = `
        <div class="item">
            <div class="post-img">
                <div class="img">
                <img src="${data.images[0].url}" alt="" />
                </div>
            </div>
            <div class="cont">
                <h5>${data.title}</h5>
                ${converter.makeHtml(data.description)}
                <div class="popup-gallery">
                  <div class="row mt-30 mb-30">
                    ${images}
                  </div>
                </div>
            </div>
        </div>`;
    })
    .then(() => {
      $(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function (item) {
            return item.el.attr("title") + "<small>by Hument Studio</small>";
          },
        },
      });
    })
    .catch((err) => console.log(err));
})();
