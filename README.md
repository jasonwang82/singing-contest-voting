# 歌唱比赛投票系统

一个纯前端实现的歌唱比赛投票系统，使用 HTML5、JavaScript 和 localStorage 实现数据存储。

## 功能特点

- 🎤 选手登记功能
  - 支持扫码登记
  - 记录选手姓名和歌曲
- 📱 投票功能
  - 每人3票限制
  - 不能重复投票给同一选手
  - 实时显示剩余票数
- 📊 实时排名
  - 自动更新排名
  - 显示选手得票情况
  - 比赛结束后展示前三名
- ✨ 现代化界面
  - 响应式设计
  - 动画效果
  - 优雅的用户界面

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Animate.css
- SweetAlert2
- QRCode.js

## 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/your-username/singing-contest-voting.git
```

2. 打开项目：
- 直接在浏览器中打开 `index.html` 文件
- 或者使用本地服务器（如 Live Server）运行项目

## 使用说明

1. 选手登记
   - 电脑端打开注册页面可看到二维码
   - 选手可扫码登记或直接填写表单

2. 投票
   - 观众输入姓名进入投票页面
   - 每人有3票
   - 不能重复投给同一选手

3. 查看排名
   - 实时更新的排行榜
   - 可结束比赛显示前三名

## 数据存储

- 使用浏览器的 localStorage 存储数据
- 清除数据方法：
  - 清除浏览器的 localStorage
  - 或在控制台执行 `votingSystem.resetAll()`

## 注意事项

- 由于使用 localStorage，数据仅保存在浏览器本地
- 建议在同一浏览器中使用
- 适合小型比赛场景

## License

MIT License 