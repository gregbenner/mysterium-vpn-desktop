/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import { observer } from "mobx-react-lite"
import { ConnectionStatus } from "mysterium-vpn-js"
import styled from "styled-components"

import { useStores } from "../../../store"
import mosaicBg from "../../../ui-kit/assets/mosaic-bg.png"
import { ConnectDisconnectButton } from "../../../connection/components/ConnectDisconnectButton/ConnectDisconnectButton"
import { Flag } from "../../../location/components/Flag/Flag"

import logoWhiteConnected from "./logo-white-connected.png"
import { ConnectionProposal } from "./ConnectionProposal"
import { ConnectionStatistics } from "./ConnectionStatistics"

const Container = styled.div`
    flex: 1;
    min-height: 0;
    background: url(${mosaicBg});
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    color: #fff;
`

const Main = styled.div`
    flex: 1;
    overflow: hidden;
`

const Status = styled.h1`
    margin: 0;
    margin-top: 32px;
    text-align: center;
    font-weight: 300;
    font-size: 24px;
`

const LocationVisual = styled.div`
    box-sizing: border-box;
    width: 464px;
    height: 108px;
    margin: 64px auto 0;

    background: url(${logoWhiteConnected});
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LocationFlag = styled(Flag)`
    padding: 16px;
`

const ConnectionIP = styled.div`
    text-align: center;
    width: 130px;
    margin: -15px 50px 0px auto;
`

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
`

const BottomBar = styled.div`
    margin-top: auto;
    box-sizing: border-box;
    height: 64px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

export const ConnectedView: React.FC = observer(() => {
    const {
        connection: { location, originalLocation, status },
    } = useStores()
    let statusText: string
    switch (status) {
        case ConnectionStatus.CONNECTING:
            statusText = "Connecting..."
            break
        case ConnectionStatus.CONNECTED:
            statusText = "Your connection is secure"
            break
        case ConnectionStatus.DISCONNECTING:
            statusText = "Disconnecting..."
            break
        case ConnectionStatus.NOT_CONNECTED:
            statusText = "Your connection is unprotected"
            break
        default:
            statusText = "Working on it..."
    }

    return (
        <Container>
            <Main>
                <Status>{statusText}</Status>
                <LocationVisual>
                    <LocationFlag countryCode={originalLocation?.country} />
                    <LocationFlag countryCode={location?.country} />
                </LocationVisual>
                <ConnectionIP>{location?.ip}</ConnectionIP>
                <ConnectionProposal />
                <ActionButtons>
                    <ConnectDisconnectButton />
                </ActionButtons>
            </Main>
            <BottomBar>
                <ConnectionStatistics />
            </BottomBar>
        </Container>
    )
})
