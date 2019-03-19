import React, { Component } from 'react'

import Main from '../main/main'
import News from '../news/news'
import Chat from '../chat/chat'
import Mine from '../mine/mine'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <Main />
        <News />
        <Chat />
        <Mine />
      </div>
    )
  }
}

export default Home