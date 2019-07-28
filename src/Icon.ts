type path = string
type viewBox = [number, number, number, number]

export type Icon = {
    content: path | path[]
    viewBox: viewBox
    status: 'READY' | 'LOADING' | 'FAILED'
}
