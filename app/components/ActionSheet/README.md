# ActionSheet
A specific style of alert that appears in response to a control or action, 
and presents a set of two or more choices related to the current context

# API:
ActionSheet属性说明如下:

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
data | 菜单选项 | object | {}
isShow | 是否显示 | bool | false
onRequestClose | 取消 | func | ''

# Demo
const data = {
  title: '',
  content: [{ text: 'VIP客户经理热线', callback: this.callback1 },
            { text: '资产配置顾问咨询', callback: this.callback2 }],
};
<ActionSheet data={data} isShow={this.state.isShow} onRequestClose={this.onCancelClick} />


