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

      {'title':'产品查询','url':'/activity/'}
      

    ]
  },
  { 
  	title:'账号管理',
    icon: 'el-icon-setting',
  	list:[
  		{'title':'重置密码','url':'/user/resetPassword/'}
  	]
  },
  { 
  	title:'订单查询',
    icon: 'el-icon-view',
  	list:[
  		{'title':'订单查询','url':'/order/'}
  	]
  }
]

module.exports = cmsNav;