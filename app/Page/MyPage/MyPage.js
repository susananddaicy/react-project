import React, {Component} from 'react';
import PanelInfo from '../../components/PanelInfo/PanelInfo.js';
import TimeLine from '../../components/TimeLine/TimeLine.js';
import Dialog from '../../components/Dialog/Dialog.js';
import VipSwiper from './VipSwiper/VipSwiper.js'
import classNames from 'classnames';
import Mydata from './My.js';
import './MyPage.css';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavClassName: 'nav-pos-init',
      isHide: false,
      dialogProps: null,
    };
    ['onscrollFn', 'clickHide', 'clickIcon', 'showDialog'].forEach((method) => {
      this[method] = this[method].bind(this);
    });  
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onscrollFn);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onscrollFn);
  }

  clickHide() {
    this.setState({
      isHide: !this.state.isHide,
    });
  }

  onscrollFn(ev) {
    const afterScrollTop = document.body.scrollTop;
    let delta = 0;
    if (afterScrollTop >= 0) {
      delta = afterScrollTop - this.beforeScrollTop;
    }
    if (delta === 0) {
      return;
    }
    this.beforeScrollTop = afterScrollTop;
    const navDom = document.getElementsByClassName('MyBrief-Text');
    const client = navDom[0].getBoundingClientRect();
    if (delta < 0) { // page up
      if (client.bottom > 0) {
        this.setState({
          showNavClassName: 'nav-pos-init',
        });
      }
    } else { // page down
      if (client.bottom <= 0) {
        this.setState({
          showNavClassName: 'nav-pos-active',
        });
      }
    }
    ev.preventDefault();
  }

  clickIcon(content) {
    this.showDialog({
      text: content,
      buttons: [{
        label: '知道了',
        onClick: () => {
          this.setState({
            dialogProps: null,
          });
        },
      }],
    });
  }

  showDialog(content) {
    this.setState({
      dialogProps: content,
    });
  }

  render() {
    const panelData = [
      { label: '电子邮件', text: Mydata.BaseInfo.email },
      { label: '手机号码', text: Mydata.BaseInfo.phone },
      { label: '行业', text: Mydata.BaseInfo.industry },
      { label: '工作岗位', text: Mydata.BaseInfo.job},    
    ];
    const panelinfoHtml = <PanelInfo body={panelData} hideBottomLine />;
    const workData = Mydata.WorkData;
    workData.forEach((i)=> {
      i.clickIcon = () => this.clickIcon(i.iconDesc);
    });
    const swiperData = [{
			"showTitle": "React框架",
		}, {
			"showTitle": "Webpack打包",
		}, {
			"showTitle": "ES6语法",
    },{
			"showTitle": "Html5",
		}, {
			"showTitle": "Hybrid",
		}, {
			"showTitle": "CSS3",
    }];
    
    return (
      <div className="myResume">
        <div className="MyBrief">
          <p className="MyBrief-Text">基本信息
            {
              this.state.isHide ? (
                <i className="lufont icon-cansee" onClick={this.clickHide}></i>
              ) :  <i className="lufont icon-cantsee" onClick={this.clickHide}></i>
            }
            </p> 
          <div className="MyBrief-BaseInfo line-bottom">
            <p className="Name">{this.state.isHide ? '***' : Mydata.BaseInfo.name}</p>
            <span className="Job line-right">{this.state.isHide ? '***' : Mydata.BaseInfo.job}</span>
            <span className="Company">{this.state.isHide ? '***' : Mydata.BaseInfo.company}</span> 
            <p>
              <span className="Sex line-right">{this.state.isHide ? '***' : Mydata.BaseInfo.sex}</span>
              <span className="Age line-right">{this.state.isHide ? '***' : Mydata.BaseInfo.age}</span> 
              <span className="Address line-right">{this.state.isHide ? '***' : Mydata.BaseInfo.address}</span>
              <span className="Years">{this.state.isHide ? '***' : Mydata.BaseInfo.workYears}</span>                                  
            </p>         
          </div>
          {panelinfoHtml}
        </div>
        <div className="WorkExprise">
          <p className="WorkExprise-Text">工作经历</p> 
          <TimeLine itemData={workData} />
        </div>
         <div className="EducationExprise">
          <p className="EducationExprise-Text">教育经历</p> 
          <TimeLine itemData={Mydata.EducationData} />
        </div> 
        <div className="ProjectExprise">
          <p className="ProjectExprise-Text">项目经验</p> 
          <TimeLine itemData={Mydata.ProjectData} />
        </div>        
        <div className={classNames('MyBrief-Text-fix', 'line-bottom', this.state.showNavClassName)}>
          基本信息
        </div>  
        <VipSwiper
          items = {swiperData}
          title = {"掌握的技能："}
        />
        <div className="myselfTalk">
          <p className="myselfTalk-Text">掌握的技能</p> 
          <div className="content">Html5,React,ES6,Webpack,Eslint,Node,Hybrid</div>
        </div>     
        {this.state.dialogProps ? <Dialog options={this.state.dialogProps} /> : null}                
      </div>
    );
  }
}

export default MyPage;
