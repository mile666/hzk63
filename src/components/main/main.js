import React, { Component } from 'react'
import { 
  SearchBar,
  Carousel,
  Grid,
  Card,
  NoticeBar,
  Badge,
  WingBlank,
  WhiteSpace
  } from 'antd-mobile'
import axios from '../../http'
import './main.css'
// menuData -> [{menu_name:?}]
// data=>[{icon,title}]

// data -> 没有[] 默认值 -> didMounted->menudata->把menudata中的数据给data

const badgeStyle = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736'
}
const thumbStyle = {
  width:"125px",
  height:"95.5px"
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesData: [],
      menuData: [],
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon: 
        'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      })),
      infoData: [],
      faqData: [],
      houseData:[],
      houseDataChange:[],
      imgHeight: 176
    }
  } 
  getHomeData = async path => {
    const res = await axios.post(`${path}`)
    // console.log(res)
    const { meta, data } = res
    if (meta.status === 200) {
      return data.list
    }
  }
// 因为houseData中有7个数据
  fn = (arr,...rest)=>{
    // console.log(rest) [2,2,3]
    let resArr = []
    for (let i = 0; i < rest.length ; i++) {
    // let arrrest = arr.splice(0,rest[i])
    // ["a","b"]
    // arrNews.push(arrrest)
      resArr.push(arr.splice(0,rest[i]))
    }
    return resArr
  }

// 发送请求
  componentDidMount = async () => {
    let imagesData = this.getHomeData(`homes/swipe`)  
    let menuData = this.getHomeData(`homes/menu`)
    let infoData = this.getHomeData(`homes/info`)
    let faqData = this.getHomeData(`homes/faq`)
    let houseData = this.getHomeData(`homes/house`)

    // 这个位置->统一获取数据->统一改状态
    const datalist = await Promise.all([
      imagesData,
      menuData,
      infoData,
      faqData,
      houseData
    ])
    console.log(datalist)
    // console.log (datalist)
    this.setState({
      imagesData: datalist[0],
      menuData: datalist[1],
      infoData: datalist[2],
      faqData: datalist[3],
      houseData:datalist[4]
    },
    () => {
      // 把menudata换成data
      let data = this.state.menuData.map((item, i) => {
        return {
          icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
          text: item.menu_name
        }
      })
      // this.state.houseData
      let temp = this.state.houseData
      let houseDataChange = this.fn(temp,2,2,3)
      console.log(houseDataChange)

      this.setState({
        data,    //key和value一样
        houseDataChange
      })
    })
  
  }
  render() {
    // 轮播
    const carouselTemplate = this.state.imagesData.map((item, i) => {
      return (
          <a
            key={i}
            href="/"
            style={{
               display: 'inline-block', 
               width: '100%',
              height: this.state.imgHeight 
            }}
          >
            <img
              src={item.original}
              alt="图片加载中"
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
      )
    })
    // 好客资讯
    const infoTemplate = this.state.infoData.map((item, i) => {
      return(
        <NoticeBar
         key={i}
         action={<span>去看看</span>} 
        mode="link" 
        marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
        >
        {item.info_title}
        </NoticeBar>
      )
    })
    // 好客问答faq
    const faqTemplate = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
          title={item.question_name}
          thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
          />
          <Card.Body>
          <div>
          <Badge text={item.question_tag} style={badgeStyle} />
          <Badge text={item.answer_content} style={badgeStyle} />
          <Badge text={item.atime} style={badgeStyle} />
          <Badge text={item.qnum} style={badgeStyle} />
          </div>
          </Card.Body>
        </Card>
      )
    })
    // 房屋列表
    // houseDataChange ->[[2],[2],[3]]
    const houseTemplate = this.state.houseDataChange.map((item1,i)=>{
      const houseTemplateItems = item1.map((item2,j)=>{
        return(
          <Card key={j}>
            <Card.Header
            thumb="http://127.0.0.1:8086/public/home.png"
            thumbStyle={thumbStyle}
            extra={
              <div>
              <Badge text={item2.home_name} style={badgeStyle} />
              <Badge text={item2.home_price} style={badgeStyle} />
              <Badge text={item2.home_desc} style={badgeStyle} />
              <Badge text={item2.home_tags} style={badgeStyle} />
              </div>
            }
            />
            
          </Card>
        )
      })
      let titles = ["最新开盘","二手精选","租个家"]
      return(
        <div key={i}>
        {/* 不要带样式,加粗 */}
        <b>{titles[i]}</b>
        {houseTemplateItems}
        </div>
      )
    })

    return (
    <div>
      {/* 搜索 */}
      <SearchBar placeholder="请输入搜索关键字" />
      <WingBlank size="md">
      {/* 轮播 */}
      <Carousel infinite>{carouselTemplate}</Carousel>
      {/* 菜单 */}
      <Grid 
      data={this.state.data} 
      isCarousel 
      onClick={_el => console.log(_el)} 
      />  
      {/* 好客资讯 */}
       {infoTemplate}
      <WhiteSpace /> 
      {/* 好客问答 */}
      {faqTemplate}
      {/* 房屋列表 */}
      {houseTemplate}
      {/* tabber 50px */}
      <div style={{height:"50px"}}></div>
      </WingBlank>
    </div>
    )
  }
}

export default Main