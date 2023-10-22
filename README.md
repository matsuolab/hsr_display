# ros_react_front

## 環境

- Node.js v20.5.0

## セットアップ

```bash
git clone git@github.com:matsuolab/hsr_display.git
cd hsr_display
```

## 起動

```bash
./RUN-DOCKER-CONTAINER.sh
```

ブラウザで http://localhost:3000 にアクセスすると、画面が表示される

## ROS インターフェース

### 文字列表示

- Topic: /hsr_monitor/string
- Type: std_msgs/String

### 画像表示

- Topic: /hsr_monitor/image/compressed
- Type: sensor_msgs/CompressedImage

### 文字色変更

- Param: /hsr_monitor/font_color
- Type: string
- Value: CSS 互換の色指定
  - ex. `"red"`, `"rgb(255, 0, 0)"`, `"hsl(0, 100%, 50%)"`
  - rosparam の仕様上、`#` から始まる色指定はできない
- Note: 文字列を表示するたびにこのパラメータは削除されるので、色を指定する場合は `/hsr_monitor/string` に文字列を送信する前に毎回このパラメータを設定する必要がある
