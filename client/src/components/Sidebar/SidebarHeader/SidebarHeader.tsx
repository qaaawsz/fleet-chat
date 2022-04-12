import React from 'react'
import {LogOutButton} from '../../styled/buttons'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const Header = styled.p`
  color: white;
  font-size: 1.4rem;
  font-weight: bolder;
`

const SidebarHeader: React.FC<{ onLogOut: Function }> = ({onLogOut}) => {
    return (
        <Container>
            <Header>
                FleetChat
            </Header>
            <LogOutButton onClick={() => onLogOut()}>
                Log Out
            </LogOutButton>
        </Container>
    )
}

export default SidebarHeader
