# NSFW API

### NSFW 分类: 使用 nsfwjs 和 express 和 grpc 构建

### 提供 restful 接口 和 grpc 调用

### Docker 打包和部署

```shell
docker image build -t nsfw:0.1 .
```

### 内容分类包括: 色情,低俗，绘画,动画,正常

### 返回格式:

数值越大，代表越符合分类

````json
{
  "drawing": 0.00013265734014566988,
  "hentai": 0.00854536797851324,
  "neutral": 0.0037522995844483376,
  "porn": 0.8447571992874146,
  "sexy": 0.14281247556209564
}
````

