/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Text, View } from "@nodegui/react-nodegui"
import React from "react"
import { observer } from "mobx-react-lite"
import { ViewProps, WidgetEventListeners } from "@nodegui/react-nodegui/dist/components/View/RNView"

import { useStores } from "../../../store"
import { brand } from "../../../ui-kit/colors"
import { textHuge } from "../../../ui-kit/typography"

export const SelectIdentityView: React.FC<ViewProps<WidgetEventListeners>> = observer(({ style, ...rest }) => {
    const { identity } = useStores()
    return (
        <View
            style={`
            flex-direction: "column";
            background: #fff;
            ${style}
            `}
            {...rest}
        >
            <View style={`padding: 32;`}>
                <Text
                    style={`
                    ${textHuge};
                    color: "${brand}";
                    `}
                >
                    Registering identity...
                </Text>
            </View>
            <View
                style={`
                flex-direction: "column";
                padding-left: 32;
                padding-right: 32;
                `}
            >
                {identity.identity && (
                    <Text>{`${identity.identity.id} | ${identity.identity.registrationStatus}`}</Text>
                )}
            </View>
        </View>
    )
})