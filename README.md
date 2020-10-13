# duoduorequest

VSCode插件 DuoDuoRequest 测试版现已发布。在VSCode 插件商店当中搜索DuoDuoRequest即可找到。

DuoDuoRequest允许你通过配置swagger或者TP-DOC文档接口，配合一个模板方法来自由便捷的插入指定接口代码，并生成jsdoc注释以此提供便捷的代码提示。

## 使用

duoduorequest: init 命令：

初始化插件，在项目中生成.duoduo文件夹。并在其中写下配置文件和一个模板生成文件样例(按照项目的实际情况修改配置文件)。

duoduorequest: cleanCatch 命令：

清除缓存，每一次生成接口代码时都会将获取到的内容缓存下来，当接口文档被更新后需要清除缓存之后再去生成。

右键：插入请求模板 命令：

右键菜单中：插入请求模板。会根据配置来请求接口文档并解析，最后通过你编写的模板生成文件来生成插入的接口代码。

duoduorequest: insert all typedef 命令：

选择一个服务，将它所有的引用类型全部插入到当前文件当中。以此可以分开typedef和具体的请求代码。

## Features

1. 在某些参数中会存在- 横杠，这在js当中是不允许的，这有点难处理。

## 已知BUG

1. 在第一次请求数据时，时常会失败。

