$(document).ready(function() {
  var navbar = document.getElementById('navbar');
  var $navbar = $(navbar);
  var content = document.getElementById('content');
  var $content = $(content);
  // Set the margin on the content so that the navbar doesn't cover it
  $content.css('top', $navbar.outerHeight());
  $content.css('min-height', $(window).height() - $navbar.outerHeight());
  // Set up some init functions
  function initHome() {
    var $portrait = $('#portrait');
    var $highlights = $('#highlights');
    var nextBanner = util.getBannerIterator();
    $portrait.on('load', function() {
      $highlights.height($portrait.height());
    });
    var initHighlights = function() {
      $highlights.html('');
      var counter;
      for(counter = 0; counter < model.highlights.length; counter++) {
        $highlights.append(util.createHighlightItem(model.highlights[counter]));
        if(counter !== model.highlights.length - 1) {
          $highlights.append(util.createHighlightDivider());
        }
      }
    };
    initHighlights();
    model.tokens.banner = window.setInterval(nextBanner, model.constants.BANNER_DUR);
  }
  function initAbout() {
    var $bio = $('#bio');
    $bio.load(model.constants.BIO_TEXT_PATH);
    $('.app-about__portrait').on('load', function() {
      util.adjustHeight('app-about__portrait');
    });
  }
  function initGrid(modelPeople) {
    return function() {
      var $bioWrapper = $('#bio-wrapper');
      var counter;
      var grid = util.createDivWithClass('app-util__person-grid');
      var row = null;
      for(counter = 0; counter < modelPeople.length; counter++) {
        if(counter % model.constants.GRID_NCOLS === 0) {
          if(row) {
            grid.appendChild(row);
          }
          row = util.createDivWithClass('app-util__person-row');
        }
        var item = util.createPersonTile(modelPeople[counter], $bioWrapper);
        $(item.querySelector('.app-util__person-overlay')).data('index', counter);
        $(item).click(function(event) {
          var person = modelPeople[$(event.target).data('index')];
          $bioWrapper.html('');
          $bioWrapper.append(util.createPersonBio(person));
          $('#bio-target').click(function(event) {
            $bioWrapper.css('visibility', 'hidden');
          });
          if(person.bio) {
            $('#bio').load(person.bio);
          } else {
            $('#bio').text('No bio found.');
          }
          $bioWrapper.css('visibility', 'visible');
        });
        row.appendChild(item);
      }
      grid.appendChild(row);
      var $grid = $('#grid');
      $grid.append(grid);
      $bioWrapper.css('top', $navbar.outerHeight());
      $bioWrapper.css('height', $(window).height() - $navbar.outerHeight());
    };
  }
  function initNewsOfYear(year) {
    year = year.toString();
    return function() {
      // Initialize the mini-navbar in an inefficient way
      var $navbar = $('.app-util__mini-navbar');
      $navbar.html('');
      var newsYear;
      var button;
      var newsYears = [];
      var counter;
      for(newsYear in model.news) {
        if(model.news.hasOwnProperty(newsYear)) {
          newsYears.push(newsYear);
        }
      }
      newsYears = newsYears.sort().reverse();
      for(counter = 0; counter < newsYears.length; counter++) {
        button = document.createElement('a');
        button.setAttribute('href', '');
        if(newsYears[counter] == year) button.setAttribute('class', 'app-util__mini-navbar-button app-util__mini-navbar-button-active');
        else button.setAttribute('class', 'app-util__mini-navbar-button');
        button.innerHTML = '<div>' + newsYears[counter] + '</div>';
        $(button).click(function(event) {
          event.preventDefault();
          initNewsOfYear(event.currentTarget.querySelector('div').textContent)();
        });
        $navbar.append(button);
      }
      var newsInfos = model.news[year];
      var $news = $('#news');
      $news.html(''); // Clear the current news div
      for(counter = 0; counter < newsInfos.length; counter++) {
        $news.append(util.createNewsItem(newsInfos[counter]));
      }
    }
  }
  function initNews() { // Returns a function that loads from the first entry of model.news
    // https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
    var maxYear = Object.keys(model.news).reduce(function(a, b){ return model.news[a] > model.news[b] ? a : b });
    return initNewsOfYear(maxYear);
  }
  // Set up on-click event handlers for loading partials
  var linkIDs = {
    'link-home': { url: '/partials/home.html', init: initHome },
    'link-about': { url: '/partials/about.html', init: initAbout },
    'link-students': { url: '/partials/students.html', init: initGrid(model.students) },
    'link-alumni': { url: '/partials/alumni.html', init: initGrid(model.alumni) },
    'link-news': { url: '/partials/news.html', init: initNews() }
  };
  $.each(linkIDs, function(linkID, partialURL) {
    var link = document.getElementById(linkID);
    var $link = $(link);
    $link.click(function(event) {
      event.preventDefault();
      $content.load(partialURL.url, function() {
        if(model.tokens.banner) {
          window.clearInterval(model.tokens.banner);
          delete model.tokens.banner;
        }
        if(partialURL.init) { // Run an initialization function if it exists
          partialURL.init();
        }
        $content.append(util.createFooter());
      });
    });
  });
  // Load the partial for home by default on startup
  $content.load(linkIDs['link-home'].url, function() {
    var init = linkIDs['link-home'].init;
    if(init) {
      init();
    }
    $content.append(util.createFooter());
  });
});
$(window).resize(function() {
  var $navbar = $('#navbar');
  var $content = $('#content');
  // Set the margin on the content so that the navbar doesn't cover it
  $content.css('top', $navbar.outerHeight());
  $content.css('min-height', $(window).height() - $navbar.outerHeight());
  util.adjustHeight('app-util__msg-portrait');
  util.adjustHeight('app-about__portrait');
});
