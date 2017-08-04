# Tab 
Tab

## 何时使用
参考 Button README.MD 把使用场景补上。

## API:

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
tabs | tab显示名称，自动计算tab平均大小| array | -
type | tab样式类型，目前有Default、Gray、Blue三种风格 | string | Default
callBack | tab切页动作完成后执行回调函数，并返回当前Tab的索引 | function | -
active | 某个tab页是否激活 | number | 0
middleLine | Tabs中间的间隔线是否显示 | bool | false
lineClass | Tabs上下的边框线是否显示 | string | line-topbottom（上下线）
classNames | 类属性 | string | -

## Demo

```js
<Tabs tabs={["七日年化走势图","万份收益走势图"]} callBack={this.setChart}/>
<Tabs tabs={["一个月","三个月","一年","今年以来"]} type="Gray" callBack={this.setChart}/>
<Tabs tabs={["赎回至余额","赎回至银行卡"]} type="Blue" lineClass="" callBack={this.setChart}/>

<Tabs tabs={["七日年化走势图","万份收益走势图"]} classNames="TabsPage-TabsPadding" callBack={this.setChart}/>

&-TabsPadding{
    margin-top: 1rem;
    >ul{
      padding:0rem 1rem;
      /*li:first-child{
        padding-left:1rem;
      };
      li:last-child{
        padding-right:1rem;
      }*/
    }
  }

setChart(index){
    alert("测试回调函数，返回索引参数："+index);
  }
```

