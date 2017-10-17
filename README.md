#  react-project
react+react router+node（express）+webpack 栈

***

# React核心概念
  * 组件
  * JSX
  * Props & State
  * Virtual DOM
# 组件
React 应用都是构建在组件之上，你编写的所有React代码基本上都是一个包含许多小组件的大组件。React组件能够像原生的HTML标签一样输出特定的界面元素，并且也能包括一些元素相关逻辑功能的代码。ES6的Class语法来声明一个React组件
```
class Greeting extends React.component {
  render() {
    return <h1>Hello,{this.props.name}</h1>
  }
}
```
# 无状态型组件
这种组件没有状态，没有生命周期，只是简单的接受 props 渲染生成 DOM 结构。无状态组件非常简单，开销很低。
因为无状态组件只是函数，所以它没有实例返回，无状态组件不支持 ref
没有 this，this 是 undefined，所以是不能使用 this 变量。
```
function Welcome(props) {
  return <h1>Hello,{props.name}</h1>
}
```
# 有状态型组件
编写组件的时候，组件可以有状态(state)，一个组件在不同状态可以有不同输出。如果把一个组件看成是一个函数的话，那么以相同的输入(props)，将会根据内部状态(state)的不同会得到不同的输出。
```
// ...other code
render() {
  return this.state.open ? <div>open</div> : <span>close</span>
}
```
# 组合组件
包含其他组件作为子组件
```
render() {
  return (
    <Avatar username="pwh">
  )
}
```
# DOM操作
大部分情况下你不需要通过查询 DOM 元素去更新组件的 UI，你只要关注设置组件的状态（setState）。但是可能在某些情况下你确实需要直接操作 DOM。
 ## findDOMNode()
     ref={(ref) => (this.tableNode = ref)}
     const container = ReactDOM.findDOMNode(this.tableNode);
     container.querySelector('.name');
## Refs
     ref=“theInput"
     this.refs.theInput.focus();
```
import ReactDOM from 'react-dom';
.... other code 
componentDidMount() {  
  const container = ReactDOM.findDOMNode(this.stepDom);
}

jsx
ref={ref => (this.stepDom = ref)}

```
# 编写组件的注意点
组件类的第一个字母必须大写，否则会报错，React 会将小写开头的标签名认为是 HTML 原生标签
组件类只能包含一个顶层标签，否则也会报错。
添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。
循环插入子元素，如果组件中包含通过循环插入的子元素，为了保证重新渲染 UI 的时候能够正确显示这些子元素，每个元素都需要通过一个特殊的 key 属性指定一个唯一值。具体原因见这里，为了内部 diff 的效率。 https://discountry.github.io/react/docs/reconciliation.html

# JSX
```
const element = <h1>Hello, world!</h1>;
```
在 JSX 中使用表达式
你可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。
这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入
因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。例如，class 变成了 className，而 tabindex 则对应着 tabIndex.

# props & state
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
所有的React组件必须像纯函数那样使用它们的props。
React当中的数据流是单向的：数据只能从父组件传向子组件，反过来则不行。
一般React应用当中的绝大多数数据都是prop，只有当用户输入内容时才会使用state来处理。
组件的state同样也能被传入到子组件中作为子组件prop的值。

# Virtual DOM
当组件状态 state 有更改的时候，React 会自动调用组件的 render 方法重新渲染整个组件的 UI
当然如果真的这样大面积的操作 DOM，性能会是一个很大的问题，所以 React 实现了一个Virtual DOM，组件 DOM 结构就是映射到这个 Virtual DOM 上，React 在这个 Virtual DOM 上实现了一个 diff 算法，当要重新渲染组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以实际上不是真的渲染整个 DOM 树。这个 Virtual DOM 是一个纯粹的 JS 数据结构，所以性能会比原生 DOM 快很多。

# react生命周期
一个React组件的生命周期分为三个部分：实例化、存在期和销毁时。
```
实例化  Mounting
constructor     
componentWillMount
render  
componentDidMount 
存在期   Updating
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()
销毁时  Unmounting
componentWillUnmount()
```
# setState
 异步操作
 批次更新
```
componentDidMount() {
  // isBatchingUpdates为true,2次setState没有生效，放在了dirtyComponents
  this.setState({
    val: this.state.val + 1,
  });
  console.log(this.state.val);
  this.setState({
    val: this.state.val + 1,
  });
  console.log(this.state.val);  

  // 执行上下文改变，没有前置的batchedUpdate调用，isBatchingUpdates为false，导致新的state立马生效
  setTimeout(() => {
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);
    this.setState({
      val: this.state.val + 1,
    });
    console.log(this.state.val);

  },0);  

/*     this.setState({
    val: this.state.val + 1,
  }, ()=> {
    console.log(this.state.val); // 2
  }); */

// 关于setTimeout，执行时间有个概念叫最小时间粒度，每次间隔也不可能是0（即使你设置为0），
// 浏览器会自动配置一个最小间隔时间，这个时间就叫最小时间粒度，不同浏览器这个时间大小也不同。
//
// http://www.ruanyifeng.com/blog/2014/10/event-loop.html
// http://javascript.ruanyifeng.com/advanced/timer.html
}
```











