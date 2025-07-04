# 歌唱比赛投票系统

一个使用纯前端（HTML、JavaScript、CSS）开发的歌唱比赛投票系统。支持选手登记、在线投票和实时排名展示。

## 功能特点

- 选手登记
  - 支持单个选手手动登记
  - 支持批量导入选手（txt文件）
  - 支持扫码登记
  - 支持录入选手姓名和歌曲信息

- 投票功能
  - 每人3票限制
  - 防止重复投票
  - 支持扫码投票
  - 显示剩余票数
  - 投票者需要输入姓名或扫码进入

- 实时排名
  - 自动更新排名数据
  - 支持结束比赛显示前三名
  - 显示金银铜牌标志

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Animate.css
- SweetAlert2
- QRCode.js
- localStorage 数据存储

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/jasonwang82/singing-contest-voting.git
```

2. 打开项目
```bash
cd singing-contest-voting
```

3. 使用浏览器打开 index.html 即可运行

## 选手批量导入

支持通过 txt 文件批量导入选手信息，文件格式要求：
- 每行一个选手
- 格式：选手姓名 歌曲名称（歌曲名可选）
- 示例：
```
张三 我的中国心
李四 月亮代表我的心
王五
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

本项目使用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件 