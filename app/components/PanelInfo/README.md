```
this.info = [
  {
    title: {name: '项目性质'},
    body: '开放式现金管理类定向委托投资项目，每天24小时开放投资、提取，T+1日收益起始计算/提取到账'
  },
  {
    title: {name: '收益起息日},
    body: '委托人在T-1日，在陆金所微店服务号发起陆小宝投资申请，在T日（含T-1日15点之后至T日15点以前）系统自动提交有效定向委托投资申请，聚昇公司在T+1日确认，T+1日起计算收益。其中（1）T日为委托人投资有效申请日，该等日期为工作日，如投资人申请日为非工作日，则应当自动顺延至下一个工作日（工作日为上海证券交易所、深圳证券交易所的正常交易日,下同）为有效申请日；（2）T+1日为T日起第一个工作日。'
  }
];

let panels = this.info.map((item, index) => {
  return <Panel type="InfoPanel" key={index} className="Info-Panel" body={item.body} />;
});
```
