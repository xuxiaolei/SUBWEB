# Subweb

一个提供ACL4SSR订阅转换链接生成的web网页,支持订阅或ss/ssr/hysteria2/vmess/vless链接，多个链接每行一个或用 | 分隔。

##  标转换类型

| 类型                     | 作为源类型 | 作为目标类型 | 参数             |
| ---------------------- | :---: | :----: | -------------- |
| Clash                  |   ✓   |    ✓   | clash          |
| ClashR                 |   ✓   |    ✓   | clashr         |
| Quantumult (完整配置)      |   ✓   |    ✓   | quan           |
| Quantumult X (完整配置)    |   ✓   |    ✓   | quanx          |
| Loon                   |   ✓   |    ✓   | loon           |
| Mellow                 |   ✓   |    ✓   | mellow         |
| SS (SIP002)            |   ✓   |    ✓   | ss             |
| SS (软件订阅/SIP008)       |   ✓   |    ✓   | sssub          |
| SSD                    |   ✓   |    ✓   | ssd            |
| SSR                    |   ✓   |    ✓   | ssr            |
| Surfboard              |   ✓   |    ✓   | surfboard      |
| Surge 2                |   ✓   |    ✓   | surge&ver=2    |
| Surge 3                |   ✓   |    ✓   | surge&ver=3    |
| Surge 4                |   ✓   |    ✓   | surge&ver=4    |
| Trojan                 |   ✓   |    ✓   | trojan         |
| V2Ray                  |   ✓   |    ✓   | v2ray          |
| 类 TG 代理的 HTTP/Socks 链接 |   ✓   |    ×   | 仅支持 `&url=` 调用 |
| Mixed                  |   ×   |    ✓   | mixed          |
| Auto                   |   ×   |    ✓   | auto           |


## 前言

基于项目[GitHub - CareyWang/sub-web](https://github.com/CareyWang/sub-web) 增加了远程配置[ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)的选项，并合并 [ACL4SSR 在线订阅转换](https://acl4ssr-sub.github.io/) 中的部分配置，并且用<u>ts + html</u>的方式重写了一个简单页面，同时去除了短链生成功能(有需要的小伙伴可以自行添加)。

## 部署使用

下载项目代码，运行

`npm install`

`npm run build`

即可在`dist`目录获得webpack打包后的静态文件。



## 自定义配置

后端参数很多，页面只提供了少部分常用的，如果有需求，可能需要修改`src/config.ts`中的选项配置，并修改`src/index.ts`中的`generateSubUrl`函数(都是傻瓜式的工作)

## 关于后端部署

### 1.服务端代码

#### 1）tindy2013大佬项目（不支持vless，hysteria2）
项目地址：https://github.com/tindy2013/subconverter
下载地址：https://github.com/tindy2013/subconverter/releases （自己选择对应平台）

#### 2）vitaminx大佬项目 (支持vless，hysteria2)
项目地址：https://github.com/vitaminx/subconverter-Hysteria
下载地址：https://github.com/vitaminx/subconverter-Hysteria/releases （自己选择对应平台）
备用地址：在`server/`目录下，自己选择对应平台

### 2.使用说明

参数详见[subconverter](https://github.com/tindy2013/subconverter/blob/master/README-cn.md#%E8%B0%83%E7%94%A8%E8%AF%B4%E6%98%8E-%E8%BF%9B%E9%98%B6)，拿到链接后，根据`后端地址`选择的不同，该链接请求的服务器也不同，个人推荐使用本地或个人服务器搭建(安全点吧，可能心理作用)，subconverter提供了多平台的[Release](https://github.com/tindy2013/subconverter/releases)，很简单可以尝试下。

#### 1)调用地址 (进阶)

```txt
http://127.0.0.1:25500/sub?target=%TARGET%&url=%URL%&emoji=%EMOJI%····
```

#### 2)调用说明 (进阶)

| 调用参数          | 必要性 | 示例                        | 解释                                                                                                                                                                                                          |
| ------------- | :-: | :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| target        |  必要 | surge&ver=4               | 指想要生成的配置类型，详见上方 [支持类型](#支持类型) 中的参数                                                                                                                                                                          |
| url           |  可选 | https%3A%2F%2Fwww.xxx.com | 指机场所提供的订阅链接或代理节点的分享链接，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，**可选的前提是在 `default_url` 中进行指定**。也可以使用 data URI。可使用 `tag:xxx,https%3A%2F%2Fwww.xxx.com` 指定该订阅的所有节点归属于`xxx`分组，用于配置文件中的`!!GROUP=XXX` 匹配 |
| group         |  可选 | MySS                      | 用于设置该订阅的组名，多用于 SSD/SSR                                                                                                                                                                                      |
| upload_path   |  可选 | MySS.yaml                 | 用于将生成的订阅文件上传至 `Gist` 后的名称，需要经过 [URLEncode](https://www.urlencoder.org/) 处理                                                                                                                                  |
| include       |  可选 | 详见下文中 `include_remarks`   | 指仅保留匹配到的节点，支持正则匹配，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，会覆盖配置文件里的设置                                                                                                                              |
| exclude       |  可选 | 详见下文中 `exclude_remarks`   | 指排除匹配到的节点，支持正则匹配，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，会覆盖配置文件里的设置                                                                                                                               |
| config        |  可选 | https%3A%2F%2Fwww.xxx.com | 指 外部配置 的地址 (包含分组和规则部分)，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，详见 [外部配置](#外部配置) ，当此参数不存在时使用 主程序目录中的配置文件                                                                                            |
| dev_id        |  可选 | 92DSAFA                   | 用于设置 QuantumultX 的远程设备 ID, 以在某些版本上开启远程脚本                                                                                                                                                                    |
| filename      |  可选 | MySS                      | 指定所生成订阅的文件名，可以在 Clash For Windows 等支持文件名的软件中显示出来                                                                                                                                                            |
| interval      |  可选 | 43200                     | 用于设置托管配置更新间隔，确定配置将更新多长时间，单位为秒                                                                                                                                                                               |
| rename        |  可选 | 详见下文中 `rename`            | 用于自定义重命名，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，会覆盖配置文件里的设置                                                                                                                                       |
| filter_script |  可选 | 详见下文中 `filter_script`     | 用于自定义筛选节点的js代码，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，会覆盖配置文件里的设置。出于安全考虑，链接需包含正确的 `token` 参数，才会应用该设置                                                                                              |
| strict        |  可选 | true / false              | 如果设置为 true，则 Surge 将在上述间隔后要求强制更新                                                                                                                                                                            |
| upload        |  可选 | true / false              | 用于将生成的订阅文件上传至 `Gist`，需要填写`gistconf.ini`，默认为 false (即不上传) ,详见 [自动上传](#自动上传)                                                                                                                                  |
| emoji         |  可选 | true / false              | 用于设置节点名称是否包含 Emoji，默认为 true                                                                                                                                                                                 |
| add_emoji     |  可选 | true / false              | 用于在节点名称前加入 Emoji，默认为 true                                                                                                                                                                                   |
| remove_emoji  |  可选 | true / false              | 用于设置是否删除节点名称中原有的 Emoji，默认为 true                                                                                                                                                                             |
| append_type   |  可选 | true / false              | 用于在节点名称前插入节点类型，如 `[SS]`,`[SSR]`等                                                                                                                                                                               |
| tfo           |  可选 | true / false              | 用于开启该订阅链接的 TCP Fast Open，默认为 false                                                                                                                                                                          |
| udp           |  可选 | true / false              | 用于开启该订阅链接的 UDP，默认为 false                                                                                                                                                                                    |
| list          |  可选 | true / false              | 用于输出 Surge Node List 或者 Clash Proxy Provider 或者 Quantumult (X) 的节点订阅 或者 解码后的 SIP002                                                                                                                         |
| sort          |  可选 | true / false              | 用于对输出的节点或策略组按节点名进行再次排序，默认为 false                                                                                                                                                                            |
| sort_script   |  可选 | 详见下文 `sort_script`        | 用于自定义排序的js代码，需要经过 [URLEncode](https://www.urlencoder.org/) 处理，会覆盖配置文件里的设置。出于安全考虑，链接需包含正确的 `token` 参数，才会应用该设置                                                                                                |
| script        |  可选 | true / false              | 用于生成Clash Script，默认为 false                                                                                                                                                                                  |
| insert        |  可选 | true / false              | 用于设置是否将配置文件中的 `insert_url` 插入，默认为 true                                                                                                                                                                      |
| scv           |  可选 | true / false              | 用于关闭 TLS 节点的证书检查，默认为 false                                                                                                                                                                                  |
| fdn           |  可选 | true / false              | 用于过滤目标类型不支持的节点，默认为 true                                                                                                                                                                                     |
| expand        |  可选 | true / false              | 用于在 API 端处理或转换 Surge, QuantumultX, Clash 的规则列表，即是否将规则全文置入订阅中，默认为 true，设置为 false 则不会将规则全文写进订阅                                                                                                                |
| append_info   |  可选 | true / false              | 用于输出包含流量或到期信息的节点, 默认为 true，设置为 false 则取消输出                                                                                                                                                                  |
| prepend       |  可选 | true / false              | 用于设置插入 `insert_url` 时是否插入到所有节点前面，默认为 true                                                                                                                                                                   |
| classic       |  可选 | true / false              | 用于设置是否生成 Clash classical rule-provider                                                                                                                                                                      |
| tls13         |  可选 | true / false              | 用于设置是否为节点增加tls1.3开启参数                                                                                                                                                                                       |
| new_name      |  可选 | true / false              | 如果设置为 true，则将启用 Clash 的新组名称 (proxies, proxy-groups, rules)                                                                                                                                                  |
