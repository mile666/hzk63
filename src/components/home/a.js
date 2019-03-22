<TabBar.Item
title="Life"
key="Life"
icon={
  <div
    style={{
      width: '22px',
      height: '22px',
      background:
        'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
    }}
  />
}
selectedIcon={
  <div
    style={{
      width: '22px',
      height: '22px',
      background:
        'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
    }}
  />
}
selected={this.state.selectedTab === 'main'}
onPress={() => {
  this.setState({
    selectedTab: 'main'
  })
}}
>
{this.renderContent('Life')}
</TabBar.Item>