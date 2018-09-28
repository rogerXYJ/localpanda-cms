<template>
  <div class="login">
    <h2>Localpanda CMS</h2>
    <div class="login_box">
      <h3>登录</h3>
      <el-form label-width="50px">
        <ul>
          <li>
              <el-form-item label="账号">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
          </li>
          <li>
              <el-form-item label="密码">
                <input class="el-input__inner" type="password" v-model="form.password" @keydown="inputEnter"></input>
              </el-form-item>
          </li>
          <li>
              <el-form-item label="">
                <el-button class="btn" @click="login" type="primary" :loading="loging">{{btnTxt}}</el-button>
              </el-form-item>
          </li>
          <li>
              <el-form-item label="">
                <p>{{errorTip}}</p>
              </el-form-item>
          </li>
        </ul>
      </el-form>
    </div>
    <div class="login_bg" id="login_bg"></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {
    
  },
  data () {
    return {
      form : {
        userName: '',
        password: ''
      },
      errorTip:'',
      btnTxt: '登录',
      loging: false
    }
  },
  methods:{
    login(){
      var self = this;
      self.errorTip = ' ';
      $.ajax({
        url: 'https://cms.localpanda.com/cms/account/login',
        type: 'POST',
        contentType: 'application/json',
        data:JSON.stringify(this.form),
        success:function(data){
          if(data.succeed){
            console.log(data)
            window.localStorage.setItem("userName",self.form.userName)
            window.localStorage.setItem('user',data.response)
            location.href = '/';
          }else{
            self.errorTip = '账号或密码错误！';
          }
          self.loging = false;
          self.btnTxt = '登录';
        },
        error: function () {
          self.loging = false;
          self.btnTxt = '登录';
        }
      });	
    },
    inputEnter(e){
      if(e.keyCode == 13){
        this.loging = true;
        this.btnTxt = '玩命登陆中';
        this.login();
      }
      
    }
    
  },
  mounted(){

    !function(){function a(a,b){function da(){W=document.createElement("canvas"),W.style.backgroundColor=ga(q.r,q.g,q.b),W.setAttribute("width",g),W.setAttribute("height",h),c.addMouseControls&&(W.addEventListener("mousemove",ta,!1),W.addEventListener("mousedown",wa,!1),W.addEventListener("mouseup",xa,!1),W.addEventListener("mouseenter",ua,!1),W.addEventListener("mouseleave",va,!1)),c.addTouchControls&&(W.addEventListener("touchstart",za,!1),W.addEventListener("touchend",Aa,!1),W.addEventListener("touchmove",Ba,!1),W.addEventListener("touchcancel",Ca,!1)),c.hideContextMenu&&(W.oncontextmenu=function(a){a.preventDefault()}),a.appendChild(W),X=W.getContext("2d"),Y=X.getImageData(0,0,g,h),Z=Y.data,$={x:W.width/2,y:W.height/2},_=!1,aa=!1,ba={x:$.x,y:$.y},U=[],V=[],S=[],T=[],la(U,o,p,q,n),la(V,l,m,q,k),oa(),pa(),c.autoResize&&(window.addEventListener("resize",ra),sa())}function ea(a,b,c){var d=a<0?-1*a:a,e=Math.round,f=parseInt,g=f(b.slice(1),16),h=f((c||(a<0?"#000000":"#FFFFFF")).slice(1),16),i=g>>16,j=g>>8&255,k=255&g;return"#"+(16777216+65536*(e(((h>>16)-i)*d)+i)+256*(e(((h>>8&255)-j)*d)+j)+(e(((255&h)-k)*d)+k)).toString(16).slice(1)}function fa(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?{r:parseInt(c[1],16),g:parseInt(c[2],16),b:parseInt(c[3],16)}:null}function ga(a,b,c){return"#"+(16777216+(c|b<<8|a<<16)).toString(16).slice(1)}function ha(a){a=a.replace(/\s+/g,"");var b=a.split("(")[1].split(")")[0].split(",");return{r:b[0],g:b[1],b:b[2]}}function ia(){for(var a=0,b=Z.length;a<b;a+=4)Z[a]=q.r,Z[a+1]=q.g,Z[a+2]=q.b,Z[a+3]=0}function ja(a,b,c,d,e,f){var h=4*(a+b*g);Z[h]=Z[h]+c,Z[h+1]=Z[h+1]+d,Z[h+2]=Z[h+2]+e,Z[h+3]=f}function ka(a,b,c,d,e,f,i,j){for(var k=Math.abs(c-a),l=Math.abs(d-b),m=a<c?1:-1,n=b<d?1:-1,o=k-l,p=a,q=b;;){if(p>-1&&p<g&&q>-1&&q<h&&ja(p,q,e,f,i,j),p===c&&q===d)break;var r=2*o;r>-k&&(o-=l,p+=m),r<l&&(o+=k,q+=n)}}function la(a,b,c,d,e){var j,k,l,m,n,f=ga(d.r,d.g,d.b),g=ga(e.r,e.g,e.b),h=[],i=[];for(k=0,l=100;k<=l;k++)j=k/100,h.push(ea(j,f,g));for(k=0,l=c-b;k<=l;k++){var o=k+b;i.push(h[o])}for(k=0,l=i.length;k<l;k++){for(h=[],m=0,n=100;m<=n;m++)j=m/100,h.push(fa(ea(j,f,i[k])));a.push(h)}}function ma(a,b){var c=Math.random()*b-b/2,d=Math.random()*b-b/2;if(a>0)for(;Math.sqrt(c*c+d*d)<a;)c=Math.random()*b-b/2,d=Math.random()*b-b/2;return{x:c,y:d}}function na(a,b,c,d,e,f){var g={};return g.x=a,g.y=b,g.z=c,g.ox=d,g.oy=e,g.x2d=0,g.y2d=0,g}function oa(){var a,b,c,d,e,f;for(a=0;a<j;a++)f=ma(0,2e4),b=f.x,c=f.y,d=Math.round(Math.random()*P),e=na(b,c,d,b,c,d),e.colorIndex=Math.floor(Math.random()*V.length),e.colorLookupTable=V[e.colorIndex],e.color=e.colorLookupTable[Math.floor(100*Math.random())],T.push(e);for(a=0;a<i;a++)f=ma(L,1e4),b=f.x,c=f.y,d=Math.round(Math.random()*P),e=na(b,c,d,b,c,d),e.distance=P-d,e.distanceTotal=Math.round(P+x),e.colorIndex=Math.floor(Math.random()*U.length),e.colorLookupTable=U[e.colorIndex],e.color=e.colorLookupTable[Math.floor(e.distance/e.distanceTotal*100)],S.push(e)}function pa(){requestAnimFrame(pa),ca||qa()}function qa(){ia();var a,c,j,k;D&&(aa?(J+=1)>I&&(J=I):(J-=1)<0&&(J=0),F=Math.easeOutQuad(J,G,H,I),C-=F*E),_?(w+=1,w>v&&(w=v),B-=1,B<0&&(B=0),N&&($.x+=(ba.x-$.x)*M),O&&($.y+=(ba.y-$.y)*M)):(w-=1,w<0&&(w=0),B+=1,B>A&&(B=A),N&&($.x+=(W.width/2-$.x)*M),O&&($.y+=(W.height/2-$.y)*M)),s=Math.easeOutQuad(w,0,u-t,v)+t,x=Math.easeInQuad(B,0,z-y,A)+y,Q=1-x;var l=s*(s/(u/K));for(a=0,c=T.length;a<c;a++)j=T[a],k=x/(x+j.z),j.x2d=j.x*k+$.x,j.y2d=j.y*k+$.y,j.x2d>-1&&j.x2d<g&&j.y2d>-1&&j.y2d<h&&ja(0|j.x2d,0|j.y2d,j.color.r,j.color.g,j.color.b,255);for(a=0,c=S.length;a<c;a++){if(j=S[a],j.distanceTotal=Math.round(P+x),r>=0?(j.z-=s,j.distance+=s,j.z<Q&&(j.z=R,j.distance=0)):(j.z+=s,j.distance-=s,j.z>R&&(j.z=Q,j.distance=j.distanceTotal)),j.color=j.colorLookupTable[Math.floor(j.distance/j.distanceTotal*100)],k=x/(x+j.z),j.x2d=j.x*k+$.x,j.y2d=j.y*k+$.y,s===t)j.x2d>-1&&j.x2d<g&&j.y2d>-1&&j.y2d<h&&ja(0|j.x2d,0|j.y2d,j.color.r,j.color.g,j.color.b,255);else{var m=j.z+l;k=x/(x+m);var n=j.x*k+$.x,o=j.y*k+$.y;n>-1&&n<g&&o>-1&&o<h&&ka(0|j.x2d,0|j.y2d,0|n,0|o,j.color.r,j.color.g,j.color.b,255)}if(F!==G){var p=e*C,q=Math.cos(p),L=Math.sin(p);j.x=q*j.ox+L*j.oy,j.y=q*j.oy-L*j.ox}}X.putImageData(Y,0,0)}function ra(a){sa()}function sa(){g=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,c.autoResizeMinWidth&&g<c.autoResizeMinWidth?g=c.autoResizeMinWidth:c.autoResizeMaxWidth&&g>c.autoResizeMaxWidth&&(g=c.autoResizeMaxWidth),c.autoResizeMinHeight&&h<c.autoResizeMinHeight?h=c.autoResizeMinHeight:c.autoResizeMaxHeight&&h>c.autoResizeMaxHeight&&(h=c.autoResizeMaxHeight),W.setAttribute("width",g),W.setAttribute("height",h),$={x:W.width/2,y:W.height/2},Y=X.getImageData(0,0,g,h),Z=Y.data}function ta(a){ba=ya(W,a)}function ua(a){_=!0}function va(a){_=!1,aa=!1}function wa(a){aa=!0}function xa(a){aa=!1}function ya(a,b){var c=a.getBoundingClientRect();return{x:b.clientX-c.left,y:b.clientY-c.top}}function za(a){a.preventDefault(),aa=!0,_=!0}function Aa(a){a.preventDefault(),aa=!1,_=!1}function Ba(a){a.preventDefault(),ba=Da(W,a)}function Ca(a){aa=!1,_=!1}function Da(a,b){var c=a.getBoundingClientRect();return{x:b.touches[0].clientX-c.left,y:b.touches[0].clientY-c.top}}var c={};if(c.width=480,c.height=480,c.autoResize=!1,c.autoResizeMinWidth=null,c.autoResizeMaxWidth=null,c.autoResizeMinHeight=null,c.autoResizeMaxHeight=null,c.addMouseControls=!0,c.addTouchControls=!0,c.hideContextMenu=!0,c.starCount=6666,c.starBgCount=2222,c.starBgColor={r:255,g:255,b:255},c.starBgColorRangeMin=10,c.starBgColorRangeMax=40,c.starColor={r:255,g:255,b:255},c.starColorRangeMin=10,c.starColorRangeMax=100,c.starfieldBackgroundColor={r:0,g:0,b:0},c.starDirection=1,c.starSpeed=20,c.starSpeedMax=200,c.starSpeedAnimationDuration=2,c.starFov=300,c.starFovMin=200,c.starFovAnimationDuration=2,c.starRotationPermission=!0,c.starRotationDirection=1,c.starRotationSpeed=0,c.starRotationSpeedMax=1,c.starRotationAnimationDuration=2,c.starWarpLineLength=2,c.starWarpTunnelDiameter=100,c.starFollowMouseSensitivity=.025,c.starFollowMouseXAxis=!0,c.starFollowMouseYAxis=!0,void 0!==b)for(var d in b)b.hasOwnProperty(d)&&c.hasOwnProperty(d)&&(c[d]=b[d]);for(var d in c)c.hasOwnProperty(d)&&d.indexOf("Duration")>-1&&(c[d]=60*c[d]);if("string"==typeof c.starBgColor&&c.starBgColor.indexOf("#")>-1?c.starBgColor=fa(c.starBgColor):"string"==typeof c.starBgColor&&c.starBgColor.indexOf("rgb")>-1&&(c.starBgColor=ha(c.starBgColor)),"string"==typeof c.starColor&&c.starColor.indexOf("#")>-1?c.starColor=fa(c.starColor):"string"==typeof c.starColor&&c.starColor.indexOf("rgb")>-1&&(c.starColor=ha(c.starColor)),"string"==typeof c.starfieldBackgroundColor&&c.starfieldBackgroundColor.indexOf("#")>-1?c.starfieldBackgroundColor=fa(c.starfieldBackgroundColor):"string"==typeof c.starfieldBackgroundColor&&c.starfieldBackgroundColor.indexOf("rgb")>-1&&(c.starfieldBackgroundColor=ha(c.starfieldBackgroundColor)),!a)throw Error("\nNo div element found");var S,T,U,V,W,X,Y,Z,$,_,aa,ba,e=Math.PI/180,g=(Math.PI,c.width),h=c.height,i=c.starCount,j=c.starBgCount,k=c.starBgColor,l=c.starBgColorRangeMin,m=c.starBgColorRangeMax,n=c.starColor,o=c.starColorRangeMin,p=c.starColorRangeMax,q=c.starfieldBackgroundColor,r=c.starDirection,s=c.starSpeed,t=s,u=c.starSpeedMax,v=c.starFovAnimationDuration,w=0,x=c.starFov,y=c.starFovMin,z=x,A=c.starFovAnimationDuration,B=A,C=0,D=c.starRotationPermission,E=c.starRotationDirection,F=c.starRotationSpeed,G=F,H=c.starRotationSpeedMax,I=c.starRotationAnimationDuration,J=0,K=c.starWarpLineLength,L=c.starWarpTunnelDiameter,M=c.starFollowMouseSensitivity,N=c.starFollowMouseXAxis,O=c.starFollowMouseYAxis,P=8e3,Q=1-y,R=P,ca=!1;Math.easeInQuad=function(a,b,c,d){return c*a*a/(d*d)+b},Math.easeOutQuad=function(a,b,c,d){return-c*a*a/(d*d)+2*c*a/d+b},window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),this.pause=function(){ca=!0},this.unpause=function(){ca=!1},da()}window.WarpDrive=a}(),"undefined"!=typeof jQuery&&function(a){a.fn.warpDrive=function(b){var c=arguments;return this.each(function(){if(a.data(this,"plugin_WarpDrive")){var d=a.data(this,"plugin_WarpDrive");d[b]?d[b].apply(this,Array.prototype.slice.call(c,1)):a.error("Method "+b+" does not exist on jQuery.warpDrive")}else a.data(this,"plugin_WarpDrive",new WarpDrive(this,b))})}}(jQuery);
    

    var settings = {

      width: $(window).width(),
      height: $(window).height(),
      autoResize: false,
      autoResizeMinWidth: null,
      autoResizeMaxWidth: null,
      autoResizeMinHeight: null,
      autoResizeMaxHeight: null,
      addMouseControls: false,
      addTouchControls: false,
      hideContextMenu: false,
      starCount: 800,
      starBgCount: 100,
      starBgColor: { r:0, g:204, b:255 },
      starBgColorRangeMin: 150,
      starBgColorRangeMax: 250,
      starColor: { r:0, g:204, b:255 },
      starColorRangeMin: 50,
      starColorRangeMax: 255,
      starfieldBackgroundColor: { r:0, g:0, b:0 },
      starDirection: -1,
      starSpeed: 10,
      starSpeedMax:20,
      starSpeedAnimationDuration: 2,
      starFov: 300,
      starFovMin: 200,
      starFovAnimationDuration: 2,
      starRotationPermission: false,
      starRotationDirection: 1,
      starRotationSpeed: 0.0,
      starRotationSpeedMax: 1.0,
      starRotationAnimationDuration: 2,
      starWarpLineLength: 2.0,
      starWarpTunnelDiameter: 100,
      starFollowMouseSensitivity: 0.025,
      starFollowMouseXAxis: false,
      starFollowMouseYAxis: false

  };

    var warpdrive = new WarpDrive( document.getElementById( 'login_bg' ) , settings);



    setTimeout(function(){
      $('.login_box').addClass('show_login show_login_run');
    },300);
    
  }
}

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .login{
    background-color: rgba(0,0,0,0.5);
    overflow: hidden;
    min-height: 100vh;
    h2{ text-align: center; color: #ddd; position:absolute; left:40px; z-index: 2; text-shadow: 0 1px 20px rgba(255,255,255,0.4);}
    
    .login_box{
      width: 350px;
      position: fixed;
      left: 50%;
      top: 50%;
      z-index:99;
      margin: -143px 0 0 -211px;
      padding: 0 40px 0 30px;
      border: 1px solid #333;
      box-shadow: 0 0 50px rgba(255,255,255,0.2);
      border-radius: 8px;
      background-color: rgba(255,255,255,0.08);
      z-index: 2;

      -webkit-transition:all 0.3s ease-out 0s;
      transition:all 0.3s ease-out 0s;
      opacity: 0;
      transform: scale(0.2);
      transform-origin:50%;

      h3{ text-align: center; font-weight: normal; color: #ddd;}
      li{
        .btn{
          display: block;
          width: 100%;
        }
        p{ color: #f00;}
        
      }
    }
    .show_login{
      opacity: 1;
      transform: scale(1);
      
    }
    .show_login_run{
      // -webkit-animation-delay:0.5s;
      // animation-delay:0.5s;
      border: 1px solid #bbb;
    }
    .login_bg{ 
      position: fixed; left: 0; top:0; width: 100%; height: 100vh; z-index: 1;
    }
  }
  
</style>
<style lang="scss">
body{
  min-width: 500px;
}
.login_box{
  li{
    .el-form-item__label{ color: #bbb;}
    .el-input__inner{
      background-color: rgba(255,255,255,0.1);
      color: #fff;
      border: 1px solid #999;
      font-size:16px;
    }
  }
}

.login_bg{ 
  canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
