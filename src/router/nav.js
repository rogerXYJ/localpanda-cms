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
  },
  {
    title:'点评管理',
    icon: 'el-icon-star-on',
    list:[
      {'title':'点评信息管理','url':'/grade/index'},
      
    ]
  },
  {
    title:'活动产品管理',
    icon: 'el-icon-menu',
    list:[
//
//    {'title':'产品基本信息','url':'/activity/info'},
//    {'title':'产品内容信息','url':'/activity/content'},
//    {'title':'产品价格信息','url':'/activity/price'}

      {'title':'新增产品','url':'/activity/add'},
      

    ]
  }
]

module.exports = cmsNav;