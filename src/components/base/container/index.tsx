import type { PropsWithChildren } from "react"

export const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="max-w-7xl mx-auto ">
            {children}
        </div>
    )
}

