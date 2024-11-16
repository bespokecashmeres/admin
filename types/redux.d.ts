import { LoggedInUser } from "@/types/index"

export type CommonStateType = {
    loading: boolean
    adminUser?: LoggedInUser
    wsUser?: LoggedInUser
}

export type CommonSliceTypes = {
    common: CommonStateType
}