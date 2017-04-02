

# LOG

*update 2017/4/2*

1. flask_server.py 中的 my_register 添加默认用户昵称否则, 修改了 weixin_auth, weixin_new_user 两个函数
2. my_db.py 中添加手机号码验证 check_dumb_phone，允许 900 开头
3. user.py 中修改 check_user_args, 手机号码允许伪号码
4. 微信中要能够点击某按钮进入主页并打开投票窗口，因此，
   - 修改 index.html，“模态框开始”部分添加了 show_vote 这个 div
   - index.js 中添加了对 show_vote 这个div 的检测，用于是否开启投票弹窗
   - flask_server.py 中的 index 函数中，开启了对 session["show_vote"] 的检测



*update 2017/3/25*

**该代码并未被合并到服务器** 

提交版本号：8c8bffe

在 user.py 文件中添加 DumbPhoneServer 类。

获取伪电话号码分为两个模块:服务器模块和客户端模块,客户端向服务器请求电话号码,采取socket进行通信，服务器模块通过端口号的唯一占用,保证进程的唯一性.客户端可以由任意多个进程和任意多个线程使用。可能出现的故障:如果测试该函数,在函数结束后,端口仍处于TCP的TIME-WAIT状态.这时候如果立刻进行第二次测试,会出现端口号占用报错.因此需要等待一会儿(端口释放),或者暂时修改端口号。



*update 2017/3/25*



个人中心相关修改

1. 调整个人中心消息通知的界面，添加消息总数和未读数量的显示，修改消息通知的底色。在 user_center_voter.css 和 user_center_notification.html 中修改部分代码。
2. 整体修改个人中心页面的相关内容。user_center_voter.html 、user_center_info.html、 user_center_notification.html 中修改了二维码的尺寸和最新投票列表，修正了个人投票页面中的投票列表的部分错误。与之配套修改的是 flask_server.py 中 /user_center_voter、/user_center_info、/user_center_notification 的内容，以及 topic.py 中的 fetch_created_topics() 和 fetch_joined_topics() 函数。



数据库手机号码的相关问题

1. 修改 flask_server 中的 /weixin_auth 和 /weixin_new_user，添加部分注释，修正部分代码
2. 在 user.py 中添加 DumbPhoneGenerator 类，全局的实例 dumb_phone_generator = DumbPhoneGenerator()，和 generate_dumb_phone() 函数，用于生成占位用的手机号码。


---

*update  2017 - 3 -16*

**微信登陆页面**
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85625e403869c2e1&redirect_uri=http%3a%2f%2fwww.zvoter.com%2fweixin_auth&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect

**数据库基础改动**

1. 用户头像 user_img_url 从 100 位改为 200 位，这是微信服务器头像长度导致的。
2. user_phone 的 UNIQUE 属性删除，因为微信登陆不一定要电话号码。

**微信服务器认证相关**

1. 在 static 目录下添加 MP_verify_RZO0Fo2eVSv0Gt29.txt 文件，用于微信服务器检测。
2. 在 flask-server 中添加 weixin_verification 函数，返回 MP_verify_RZO0Fo2eVSv0Gt29.txt 文件。

**微信登陆相关代码**

1. 在 flask-server 中添加 weixin_auth 函数，作为微信登陆的入口
2. 在 flask-server 中添加 weixin_new_user 函数，作为微信注册为新用户的入口
3. 在 flask-server 中修改 my_login 函数，在里面加入绑定微信的代码

**用于支持微信登陆，修改用户工具类的相关代码**

1. 在 user.py 中添加 check_wx 用于检测用户微信是否已经注册过
2. 在 user.py 中添加 check_phone_registered 用于检测是否手机是否注册过
3. 修改 user.py 中的 add_user，对于微信登录，允许手机号不存在
4. 修改 user.py 中的 check_user_args，主要是 openid 和 img_url 中包含特殊字符会被这个函数过滤掉
5. 修改 user.py 中的 edit_user， 微小的改动

**微信登陆页面**

1. 添加了 user_weixin_binding.html / js / css 三个对应的文件

**潜在的 BUG**

1. 微信提供的地点可能不含省市，与数据库不一致，例如微信提供“上海”，但是个人中心的地点是“上海市”，会出现报错。因为一个地理位置的字典里，有“上海市”这个键，没有“上海”。因此微信的地理位置暂时并没有整合进去。


-----





*update: 2017-03-06*

以下是以 https://github.com/justonlyyo/zvoter 中的 zvoter_mon 分支为基准的变更记录：

**对于投票页面进行了小的修改。**

1. 添加 user_center_voter.js
2. 修改 user_center_voter.html 的左侧信息部分，删除“我收藏的投票”, 在我发布的投票和我参加的投票右侧添加计数
3. 修改 flask_server 中 user_center_voter 函数
4. 修改 topic.py 中的 fetch_joined_topics 函数，并删除了 fetch_starred_topics 函数

**添加通知中心的页面**

5. 添加 user_center_notification 的 .html 和 .js 文件
6. 在 user_center_info.css 中添加 user_center_notification 部分（见代码最后）
7. 添加 notification.py 文件，用于消息的推送相关函数
8. 在 flask_server.py 中添加 user_center_notification 函数处理页面，并添加 mark_notification 函数设置消息的已读
9. 数据库中添加新的 notification 表，结构如下：

<table>
<tr><td>user_id</td><td>用户id</td></tr>
<tr><td>topic_id</td><td>话题id</td></tr>
<tr><td>detail</td><td>通知细节</td></tr>
<tr><td>read</td><td>已读（0为未读，1为已读）</td></tr>
<tr><td>date</td><td>通知第一次创建的时间</td></tr>
</table>
