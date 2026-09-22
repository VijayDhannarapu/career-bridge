export type FormProps = {
    success: boolean
    message: string
    status: number
}
export const initialState: FormProps = {
    success: false,
    message: "",
    status: 0
}