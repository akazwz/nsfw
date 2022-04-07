# NSFW API

[简体中文](README_ZH.md)

### NSFW classify: build with nsfwjs and express and grpc

### Provider restful api and grpc

### Docker build and deploy

```shell
docker image build -t nsfw:0.1 .
```

### Classify include: drawing,hentai,neutral,porn,sexy

### Response:

value bigger, more fit to classify

````json
{
  "drawing": 0.00013265734014566988,
  "hentai": 0.00854536797851324,
  "neutral": 0.0037522995844483376,
  "porn": 0.8447571992874146,
  "sexy": 0.14281247556209564
}
````

