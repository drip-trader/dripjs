# 为dripjs贡献代码

## 提交信息指南

### 提交信息格式
每个提交消息由应此三项组成： **header**，**body**，**footer**。
**header**以**type**，**scope**，**subject**的形式描述。

例)
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**header** 为必选项。 **scope** 请在必要的时刻适当的描述。

提交信息请以100个字符换行。(为了方便查看)


```
docs(changelog): update change log to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
RevertCommit的时候、信息请以 `revert: ` 为开始。
如果要撤销恢复到之前的提交版本，它应以`revert:`为开始，然后在`header`中写撤销的标题。 接着`body`中描述： `This reverts commit <hash>.`。

### Type
请使用以下的类型。

* **build**: 影响构建系统或外部依赖项的修改（例如：gulp，broccoli，npm）
* **ci**: CI配置文件和脚本的修改（例如：Travis，Circle，BrowserStack，SauceLabs）
* **docs**: 仅更改文档
* **feat**: 新功能
* **fix**: 修复错误
* **perf**: 改进性能的代码修改
* **refactor**: 既不是修复错误也不添加功能的代码更改
* **style**: 不影响代码含义的更改（空格，格式，缺少分号等）
* **test**: 添加缺少的测试或更正现有测试

### Scope
对于范围,请使用 `lower-case` 格式指定模块名称。

```text
例) 
- `BitmexSpy` => `bitmex-spy`
- `Utils` => `utils` 
```

### subject
请提供有关该主题的简要说明。

* 动词请使用现在时态: "change" 而不是 "changed" 或 "changes"
* 第一个字母请不要大写
* 结尾不要使用句号

### body
与主题相同，使用现在时态。

### footer

在页脚中包含 **Breaking Changes** 的信息，以及由于此提交对应**Closes**的Issue引用。