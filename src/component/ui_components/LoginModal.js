import React from 'react'
import { Button, Header, Image, Modal, Input, Grid } from 'semantic-ui-react'

const LoginModal = () => (
  <Modal trigger={<Button>登录</Button>}>
    <Modal.Header>登录</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>请输入</Header>
          <Grid>
            <Grid.Row>
              <Input label='用户名' placeholder='' />
            </Grid.Row>
            <Grid.Row>
              <Input label='密码' placeholder='' />
            </Grid.Row>
            <Grid.Row>
              <Button secondary>确认</Button>
            </Grid.Row>
          </Grid>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default LoginModal