import react, { Component } from 'react';
import './FlexPage.css';
class FlexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <p style={{fontSize: '20px'}}>Flex布局（弹性布局）</p>   
        <div className="Box" style={{display: 'flex'}}>
          <div className="Item"></div>
        </div>    
        <p className="Tip">
          flex-flow是flex-direction和flex-wrap的简写形式，默认是row nowrap <br/>
          flex-direction: 项目的排列方向  //row(默认) column row-reverse column-reverse   <br/>
          flex-wrap: 如果一条轴线排不下，如何换行  //nowrap不换行(默认)，wrap换行，wrap-reverse换行，第一行在下方  <br/>
        </p>
        <div className="Box" style={{display: 'flex',flexFlow: 'row wrap'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>   
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>   
        </div>     
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>   
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>   
        </div>  
        <div className="Box" style={{display: 'flex',flexFlow: 'column nowrap'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>    
        <p className="Tip">
          justify-content: flex-start | flex-end | center | space-between | space-around;
        </p>
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'center'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>    
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'flex-end'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>  
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'space-between'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>     
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'flex-start'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>  
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', justifyContent: 'space-around'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div>  
        <p className="Tip">
          align-items: flex-start | flex-end | center | baseline | stretch;
        </p>
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', alignItems: 'center'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div> 
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', alignItems: 'flex-end'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div> 
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', alignItems: 'flex-start'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
          <div className="Item"></div>  
          <div className="Item"></div>
        </div> 
        <div className="Box" style={{display: 'flex',flexFlow: 'column nowrap', justifyContent: 'center'}}>  
          <div className="Item"></div>
          <div className="Item"></div>
        </div> 
        <p className="Tip">
          项目的属性 <br/>
          order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。<br/>
          flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 <br/>
          flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。<br/>
          flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。 <br/>
          flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。(flex: initial)后两个属性可选。 <br/>
          flex:1 ( flex-grow: 1; flex-shrink: 1; flex-basis: 0%;)     
        </p>
        <div className="Box" style={{display: 'flex',flexFlow: 'row nowrap', alignItems: 'center'}}>  
          <div style={{flex: 1}} className="Item"></div>
          <div style={{flex: 1}} className="Item"></div>
          <div style={{flex: 1}} className="Item"></div>  
          <div style={{flex: 1}} className="Item"></div>
        </div> 
        <p className="Tip">
          百分比布局 
          flex: initial =====  flex: '0 1 auto' (默认)
        </p>
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: 1}} className="Item1 line-right">1/2</div>
          <div style={{flex: 1}} className="Item1">1/2</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: '0 0 90%'}} className="Item1 line-right">占90%的宽度</div>
          <div style={{flex: 1}} className="Item1">占满剩余</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: 'initial', width: '2rem'}} className="Item1 line-right">固定2rem宽度</div>
          <div style={{flex: 1}} className="Item1">占满剩余</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: 'initial', width: '2rem'}} className="Item1 line-right">固定2rem宽度</div>
          <div style={{flex: 1}} className="Item1 line-right">占满剩余</div>
          <div style={{flex: 'initial', width: '2rem'}} className="Item1">固定2rem宽度</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: 1}} className="Item1 line-right">1/3</div>
          <div style={{flex: 1}} className="Item1 line-right">1/3</div>
          <div style={{flex: 1}} className="Item1 line-right">1/3</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: '0 0 50%'}} className="Item1 line-right">1/2</div>
          <div style={{flex: '0 0 25%'}} className="Item1 line-right">1/4</div>
          <div style={{flex: '0 0 25%'}} className="Item1 line-right">1/4</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: '0 0 50%'}} className="Item1 line-right">1/2</div>
          <div style={{flex: 'initial',width: '4rem'}} className="Item1 line-right">auto</div>
          <div style={{flex: 'initial'}} className="Item1 line-right">auto</div>
        </div> 
        <div className="Box1" style={{display: 'flex',flexFlow: 'row nowrap'}}>  
          <div style={{flex: '0 0 25%'}} className="Item1 line-right">1/4</div>
          <div style={{flex: 'initial',width: '4rem'}} className="Item1 line-right">auto</div>
          <div style={{flex: '0 0 33.33%'}} className="Item1 line-right">1/3</div>
        </div> 
        <p className="Tip">
          常用的例子，例如3个div垂直剧中
        </p>
        <div className="Box1" style={{display: 'flex',flexFlow: 'column nowrap',justifyContent: 'center'}}>  
          <div className="Item1" style={{textAlign: 'center'}}>text</div>
          <div className="Item1" style={{textAlign: 'center'}}>text</div>
          <div className="Item1" style={{textAlign: 'center'}}>text</div>
        </div> 
      </section>    
    );
  }
}
export default FlexPage;