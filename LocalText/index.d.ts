// import * as React from "react"

interface LocalizableProps {

    /**
     * @description
     */
    children: string | Element | Array<Element>;

    /**
     * @description
     */
    paramArray?: Array<any>;

    /**
     * @description
     */
    type?: HTMLAllCollection;

}

// export function Localizable(
//     props: LocalizableProps & React.SVGProps<SVGElement>
// ): string | HTMLAllCollection | ReactNative.Text ;