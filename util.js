var util = (function() {
  var createDivWithClass = function(str, id) {
    var div = document.createElement('div');
    div.setAttribute('class', str);
    if(id) div.setAttribute('id', id);
    return div;
  };
  var createPersonTile = function(person) {
    var item = createDivWithClass('app-util__person-wrapper');
    item.innerHTML = `
    <div class="app-util__person-portrait">
      <div class="app-util__person-name">
        <div class="app-util__person-name-content"></div>
      </div>
      <div class="app-util__person-overlay"></div>
    </div>
    `;
    item.getElementsByClassName('app-util__person-name-content')[0].textContent = person.name || 'Unnamed Person';
    if(person.image) {
      item.getElementsByClassName('app-util__person-portrait')[0].setAttribute('style', 'background-image: url("' + person.image + '");');
    }
    return item;
  };
  var compareNames = function(x, y) {
    if(x.name < y.name) return -1;
    else if(x.name > y.name) return 1;
    return 0;
  };
  var formatDate = function(date) {
    var str = (date.getMonth() + 1).toString();
    str += '/' + date.getDate();
    str += '/' + date.getFullYear();
    return str;
  };
  var createNewsItem = function(newsInfo) {
    var item = createDivWithClass('app-util__msg-content');
    item.innerHTML = `
    <div class="app-util__msg-header">
      <div class="app-util__msg-title"></div>
      <div class="app-util__msg-info"></div>
    </div>
    <div class="app-util__msg-item"></div>
    `;
    item.getElementsByClassName('app-util__msg-title')[0].textContent = newsInfo.title || 'News Item';
    item.getElementsByClassName('app-util__msg-info')[0].textContent = formatDate(newsInfo.date) || 'Date';
    var content = item.getElementsByClassName('app-util__msg-item')[0];
    $(content).load(newsInfo.content);
    return item;
  };
  var createDate = function(m, d, y) {
    return new Date(y, m - 1, d);
  };
  var createHighlightItem = function(highlightInfo) {
    var item = createDivWithClass('app-home__news-item');
    var title = document.createElement('h3');
    title.textContent = highlightInfo.title;
    item.appendChild(title);
    var description = document.createElement('p');
    description.textContent = highlightInfo.description;
    item.appendChild(description);
    return item;
  };
  var createHighlightDivider = function() {
    return createDivWithClass('app-home__news-divider');
  };
  var createFooter = function() {
    var footer = document.createElement('div');
    var $footer = $(footer);
    $footer.load('/partials/footer.html');
    return footer;
  };
  var getBannerIterator = function() {
    var nextImage = 0;
    var banner = document.getElementById('banner');
    var bannerBehind = document.getElementById('banner-behind');
    var bannerVisible = true;
    banner.style.opacity = 0;
    bannerBehind.setAttribute('style', 'background-image: url("' + model.banner[nextImage] + '");');
    var nextBanner = function() {
      nextImage = (nextImage + 1) % model.banner.length;
      bannerVisible = !bannerVisible;
      if(bannerVisible) {
        banner.style.opacity = 0;
        bannerBehind.setAttribute('style', 'background-image: url("' + model.banner[nextImage] + '");');
      } else {
        banner.style.opacity = 1;
        banner.setAttribute('style', 'background-image: url("' + model.banner[nextImage] + '");');
      }
    };
    return nextBanner;
  };
  var createPersonBio = function(person) {
    var item = createDivWithClass('app-util__short-bio');
    item.innerHTML = `
    <div class="app-util__msg-content">
      <div class="app-util__msg-header">
        <div class="app-util__msg-title"></div>
        <div class="app-util__msg-info">
          <img src="/images/close.svg" class="app-util__msg-close" id="bio-target"></img>
        </div>
      </div>
      <div class="app-util__msg-item">
        <img class="app-util__msg-portrait"/>
        <div id="bio"></div>
      </div>
    </div>
    `;
    item.getElementsByClassName('app-util__msg-title')[0].textContent = person.name || 'Unnamed Person';
    var $portrait = $(item.getElementsByClassName('app-util__msg-portrait')[0]);
    var $bio = $(item.querySelector('#bio'));
    if(person.image) {
      $portrait.attr('src', person.image);
      $portrait.on('load', function() {
        $bio.css('min-height', $portrait.height());
      });
    } else {
      item.getElementsByClassName('app-util__msg-portrait')[0].setAttribute('style', 'display: none;');
    }
    return item;
  };
  var adjustHeight = function(className) {
    var portraitMatches = document.getElementsByClassName(className);
    if(portraitMatches.length > 0) {
      var $portrait = $(portraitMatches[0]);
      var $bio = $('#bio');
      $bio.css('min-height', $portrait.height());
    }
  };
  var util = {
    createDivWithClass: createDivWithClass,
    createPersonTile: createPersonTile,
    compareNames: compareNames,
    createNewsItem: createNewsItem,
    createDate: createDate,
    createHighlightItem: createHighlightItem,
    createHighlightDivider: createHighlightDivider,
    createFooter: createFooter,
    getBannerIterator: getBannerIterator,
    createPersonBio: createPersonBio,
    adjustHeight: adjustHeight
  };
  return util;
})();
