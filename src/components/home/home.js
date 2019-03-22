import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './home.css'

import Main from '../main/main'
import News from '../news/news'
import Chat from '../chat/chat'
import Mine from '../mine/mine'

import TabBarDataFromJson from './tabbardata.json'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'main',
      hidden: false
      // fullScreen: true
    }
  }
  renderContent = () => {
    // console.log(this.state.selectedTab)
    const selectedTab = this.state.selectedTab
    switch (selectedTab) {
      case 'main':
      return <Main />
      break
      case 'news':
      return <News />
      break
      case 'chat':
      return <Chat />
      break
      case 'mine':
      return <Mine />
      break
      default:
      break
    }
    // 判断不同的tab点击时 哪里不一样->if/switch case->
  }
  render() {
    // 封装tabbar里面的tab
    // const TaBarItemsTemlate = 数组.map()
    const TabBarItemsTemplate = TabBarDataFromJson.TabBarItemsData.map(
      (item, i) => {
      return (
        <TabBar.Item
            title={item.title}
            key={item.key}
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `${item.icon_bg_url}`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `${item.sele_bg_url}`
                }}
              />
            }
            selected={this.state.selectedTab === item.selectedPath}
            onPress={() => {
              this.setState({
                selectedTab: `${item.selectedPath}`
              })
            }}
          >
            {this.renderContent()}
          </TabBar.Item>
      )
    }
  )
    return (
     
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {TabBarItemsTemplate}
        </TabBar>
   
    )
  }
}

export default Home
