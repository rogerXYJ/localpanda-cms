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
      {'title':'编辑文章','url':'/content/editArticle'},
      {'title':'邮件模版','url':'/content/email'}
    ]
  }
]

module.exports = cmsNav;