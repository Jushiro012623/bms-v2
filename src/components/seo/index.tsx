import { Fragment } from "react";

const SEO = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children?: any;
}) => (
    <Fragment>
        <title>{title}</title>
        <meta name="description" content={description} />
        {children}
    </Fragment>
);

export default SEO;
