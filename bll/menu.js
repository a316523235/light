module.exports = function() {
  this.menuProduct = [
    { name: '节目灯串', url: '/collections/list/lights/jmdc', child: []}
  ];
  this.menuType = [
    {
        name: 'party', url: '/collections/list/party/all', child: [
        { name: 'new year', url: '/collections/list/party/new year', child: [] }
        ]
    },
    {
        name: 'color', url: '/collections/list/color/all', child: [
        { name: 'red', url: '/collections/list/color/red', child: [] },
        { name: 'yerrow', url: '/collections/list/color/yerrow', child: [] },
        { name: 'green', url: '/collections/list/color/green', child: [] },
        { name: 'blue', url: '/collections/list/color/blue', child: [] },
        { name: 'purple', url: '/collections/list/color/purple', child: [] },
        { name: 'white', url: '/collections/list/color/white', child: [] },
        { name: 'golden', url: '/collections/list/color/golden', child: [] },
        { name: 'silvery', url: '/collections/list/color/silvery', child: [] }
        ]
    }
  ];
  this.menus = [
    { name: 'Home', url: '/', child: null },
    { name: '产品', url: '/collections/list/Lights/all', child: this.menuProduct },
    { name: 'News', url: '/collections/list/News/all', child: null },
    { name: '分类', url: '/collections/list/Products/all', child: this.menuType },
    { name: '展示', url: '/collections/list/Showing/all', child: null }
  ];
};
