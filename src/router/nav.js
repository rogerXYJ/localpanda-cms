var cmsNav = [
  //LP导航
  {
    title:'LP管理',
    icon: 'el-icon-menu',
    list:[
      {'title':'关键词管理','url':'/lp/keyword/'}
    ]
  },
  //内容管理导航
  {
    title:'内容管理',
    icon: 'el-icon-document',
    list:[
      {'title':'新增文章','url':'/content/addArticle'},
      {'title':'编辑文章','url':'/content/editArticle'}
    ]
  },
   {
    title:'点评管理',
    icon: 'el-icon-star-on',
    list:[
      {'title':'点评信息管理','url':'/grade/index'},
      
    ]
  }
]

module.exports = cmsNav;