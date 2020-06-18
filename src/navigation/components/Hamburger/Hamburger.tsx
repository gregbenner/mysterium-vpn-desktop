/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import { remote } from "electron"

import { useStores } from "../../../store"

type Div = React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

const Icon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 8px;
    margin-left: 8px;
` as Div

export const Hamburger: React.FC = observer(() => {
    const { navigation } = useStores()
    const dropdownMenuRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLDivElement>(null)
    const handleClickOutside: EventListener = (event) => {
        const isOutsideClick =
            !dropdownMenuRef.current?.contains(event.target as Node) &&
            !hamburgerRef.current?.contains(event.target as Node)
        if (isOutsideClick) {
            navigation.showMenu(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
        }
    })
    const quit = () => {
        remote.app.quit()
    }
    return (
        <>
            <Icon
                ref={hamburgerRef}
                onClick={() => {
                    navigation.showMenu(!navigation.menu)
                }}
            >
                <FontAwesomeIcon icon={faBars} size={"lg"} color="#434343" />
            </Icon>
            {navigation.menu && (
                <DropdownMenu ref={dropdownMenuRef}>
                    <MenuItem
                        onClick={() => {
                            navigation.showMenu(false)
                            remote.app.showAboutPanel()
                        }}
                    >
                        About the app
                    </MenuItem>
                    <Separator />
                    <MenuItem onClick={quit}>Quit</MenuItem>
                </DropdownMenu>
            )}
        </>
    )
})

const DropdownMenu = styled.div`
    position: absolute;
    top: 36px;
    right: 2px;
    width: 236px;
    padding: 4px 0;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
    z-index: 5;
    overflow: hidden;
    color: #404040;
    user-select: none;
` as Div

const MenuItem = styled.div`
    min-height: 32px;
    line-height: 32px;
    padding: 0 16px;
    &:hover {
        background: linear-gradient(180deg, #873a72 0%, #673a72 100%);
        color: #fff;
    }
` as Div

const Separator = styled.div`
    height: 1px;
    background: #e6e6e6;
`