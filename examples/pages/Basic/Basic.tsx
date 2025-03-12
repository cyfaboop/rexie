import { h, FC, useMemo, useState, memo } from 'rexie'

import { Button, generateButtonLayoutProps } from '../../components/Button'
import { Container } from './Container'

const pages = [
    'Container',
    'Transparent Background',
    'Tinting',
    'Cache As Bitmap',
    'Blend Modes',
    'Particle Container',
    'Simple Plane',
]

const Components: Record<
    string,
    FC<{
        screenWidth: number
    }>
> = {
    Container: Container,
}

export const Basic: FC<{
    screenWidth: number
}> = memo(({ screenWidth }) => {
    const [currentPage, setCurrentPage] = useState('Container')
    const { propsArr, lineWrapY } = useMemo(
        () => generateButtonLayoutProps(pages, 60, 30, screenWidth),
        [screenWidth],
    )

    const DynamicComponent = useMemo(
        () => Components[currentPage] || Container,
        [currentPage],
    )

    return (
        <container>
            {propsArr.map(props => (
                <Button
                    {...props}
                    active={currentPage === props.text}
                    onClick={() => {
                        setCurrentPage(props.text)
                    }}
                />
            ))}
            <container y={lineWrapY}>
                <DynamicComponent screenWidth={screenWidth} />
            </container>
        </container>
    )
})
