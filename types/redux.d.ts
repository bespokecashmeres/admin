import { LoggedInUser } from "@/types"

export type CommonStateType = {
    loading: boolean
    adminUser?: LoggedInUser
    wsUser?: LoggedInUser
}

export type CommonSliceTypes = {
    common: CommonStateType
}