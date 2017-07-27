var model = (function() {
  var VERSION = '1.00';
  var constants = {
      GRID_NCOLS: 3,
      PORTRAIT_PLACEHOLDER: '/images/yundi-li.jpg',
      BIO_TEXT_PATH: '/bios/stella-xu.html',
      BANNER_DUR: 7500
  };
  var banner = [
    '/images/isaac-stern.jpg',
    '/images/piano-closeup.jpg',
    '/images/piano-bw.jpg'
  ];
  var students = [
    { name: 'Yundi Li', image: '/images/yundi-li.jpg' },
    { name: 'Lang Lang', image: '/images/lang-lang.jpg', bio: '/bios/lang-lang.html' },
    { name: 'Mark Sabini', image: null },
    { name: 'Ivo Pogorelich', image: '/images/ivo-pogorelich.jpg' },
    { name: 'Glenn Gould', image: '/images/glenn-gould.jpg' }
  ].sort(util.compareNames);
  var alumni = [
    { name: 'Yundi Li', image: '/images/yundi-li.jpg' },
    { name: 'Mark Sabini', image: null },
    { name: 'Lang Lang', image: '/images/lang-lang.jpg' }
  ].sort(util.compareNames);
  var highlights = [
    { title: 'Highlight #1', description: 'A short description, should not be long.' },
    { title: 'Highlight #2', description: 'A short description, should not be long.' },
    { title: 'Highlight #3', description: 'A short description, should not be long.' }
  ];
  var news = {
    '2017': [
      { title: 'Test News Item', date: util.createDate(7, 19, 2017), content: '/news/2017/testnews.html' }
    ],
    '2016': [
      { title: 'Old News Item', date: util.createDate(6, 4, 2017), content: '/news/2016/oldnews.html' }
    ]
  };
  var tokens = {};
  var model = {
    VERSION: VERSION,
    constants: constants,
    banner: banner,
    students: students,
    alumni: alumni,
    news: news,
    highlights: highlights,
    tokens: tokens
  };
  return model;
})();
